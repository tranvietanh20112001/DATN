import * as Yup from "yup";

export const TeacherValidationSchema = Yup.object().shape({
    full_name: Yup.string().required("Tên giáo viên là bắt buộc"),
    campus: Yup.string().required("Lựa chọn cơ sở là bắt buộc"),
    faculty: Yup.string().required("Lựa chọn chuyên ngành là bắt buộc")
});
