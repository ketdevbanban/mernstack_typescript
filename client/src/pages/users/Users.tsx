import axios from "axios";
import { useEffect, useState, useRef } from "react";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { Button, Input, Space, Switch, Table } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { InputRef } from "antd";

import Swal from "sweetalert2";

import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { User } from "../../models/user";

export default function Users() {
  //State
  const [users, setUsers] = useState<User[]>([]);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  //Effect
  useEffect(() => {
    loadUserData();
  }, []);
  //Load Data
  const loadUserData = async () => {
    try {
      const { data } = await axios.get("users");
      setUsers(data);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  // Delet Function
  const del = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "ເຈົ້າຕ້ອງການລຶບແທ້ບໍ່",
        text: "ຖ້າເຈົ້າລຶບ ຈະບໍ່ສາມາດກູ້ຄືນມາໄດ້",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await axios.delete(`users/${id}`);

        setUsers(users?.filter((u: User) => u.id !== id));
      }
    } catch (error) {
      toast.error("ການລຶບບໍ່ສຳເລັດ", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  //Serch
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof User
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof User): ColumnType<User> => ({
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

  const onChangeStatus = async (id: number, status: boolean) => {
    try {
      await axios.put(`users/${id}/status`, { status });
      loadUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",

      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
      ...getColumnSearchProps("last_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "email",
      render: (record) => record?.name,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",

      render: (status,record) => (
        <Switch
          checked={status}
          onChange={() => onChangeStatus(record.id, !status)}
          className="bg-gray-500"
        />
      ),
    },
    {
      title: "Actions",
      render: (record) => (
        <div>
          <span onClick={() => del(record.id)} className="cursor-pointer">
            <DeleteOutlined
              style={{
                fontSize: "20px",
                color: "#b34969",
              }}
            />
          </span>
          <Link to={`/users/${record.id}/edit`}>
            <span className="mr-20">
              <EditOutlined
                style={{
                  fontSize: "20px",
                  color: "#b34969",
                  marginRight: "10px",
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
      <div>
        <div className="flex justify-end">
          <Link to="/register" className="text-lg">
            <PlusCircleOutlined
              style={{ fontSize: 30, marginRight: 7, color: "green" }}
            />
            Add
          </Link>
        </div>

        <div className="w-full overflow-x-scroll xl:overflow-x-hidden h-screen pt-3">
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    </AdminLayout>
  );
}
