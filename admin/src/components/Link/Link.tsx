import I from "@components/Icon/Icon";

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const links: Link[] = [
  {
    name: "Trang chủ",
    url: "/trang-chu",
    icon: <I.HomeIcon />,
  },
  {
    name: "Quản lý đồ án",
    url: "/do-an",
    icon: <I.FolderIcon />,
  },
  {
    name: "Quản lý sinh viên",
    url: "/sinh-vien",
    icon: <I.SchoolIcon />,
  },
  {
    name: "Quản lý cơ sở",
    url: "/co-so",
    icon: <I.LocationCityIcon />,
  },
  {
    name: "Quản lý giáo viên",
    url: "/giao-vien",
    icon: <I.GroupsIcon />,
  },
  {
    name: "Quản lý chuyên ngành",
    url: "/chuyen-nganh",
    icon: <I.SupervisedUserCircleIcon />,
  },
  {
    name: "Quản lý Tag",
    url: "/tag",
    icon: <I.TagIcon />,
  },
  {
    name: "Quản lý Bình luận",
    url: "/binh-luan",
    icon: <I.ChatBubbleIcon />,
  },
];

const AccountLink: Link[] = [
  {
    name: "Quản lý danh sách tài khoản",
    url: "/tai-khoan",
    icon: <I.ManageAccountsIcon />,
  },
  {
    name: "Quản lý tài khoản của bạn",
    url: "/tai-khoan-cua-ban",
    icon: <I.AccountCircleIcon />,
  },
];

export default { links, AccountLink };
