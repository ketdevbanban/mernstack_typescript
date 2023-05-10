//import Libray
import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import type { ColumnsType, ColumnType } from "antd/es/table";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import type { FilterConfirmProps } from "antd/es/table/interface";
import { Button, Input, Space, Table } from "antd";
import type { InputRef } from "antd";

//interface
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}
//

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get("products");
        setProducts(data);
        console.log(data);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const del = async (id: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`products/${id}`);

        setProducts(products.filter((p: Product) => p.id !== id));
        toast.success("ການລຶບສິດສຳເລັດ", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.warn("ບໍ່ສາມາດລຶບໄດ້ເນຶ່ອງຈາກວ່າ ຍັງມີຜູ້ໃຊ້ກົດນີ້ຢູ່", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  //Serch
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof Product
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof Product
  ): ColumnType<Product> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="p-8" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, backgroundColor: "green" }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Product> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Images",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Prices",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
    },

    {
      title: "Actions",
      render: (record) => (
        <div className="flex ">
          <span onClick={() => del(record.id)} className="cursor-pointer">
            <DeleteOutlined
              style={{
                fontSize: "20px",
                color: "#b34969",
              }}
            />
          </span>
          <Link to={`/admin/product/${record.id}/edit`}>
            <span>
              <EditOutlined
                style={{
                  fontSize: "20px",
                  color: "#b34969",
                  marginLeft: "5px",
                }}
              />
            </span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="h-screen">
        <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen pt-3">
          <Table columns={columns} dataSource={products} />
        </div>
      </div>
    </AdminLayout>
  );
}
