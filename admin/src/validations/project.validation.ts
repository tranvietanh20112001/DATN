import * as Yup from "yup";

export const ProjectValidationSchema = Yup.object().shape({
  grade: Yup.number()
    .min(40, "Số điểm của dự án phải trên 40")
    .max(100, "Số điểm của dự án phải dưới 100")
    .required("Số điểm là bắt buộc"),
    title: Yup.string().required("Tên là bắt buộc")
});
