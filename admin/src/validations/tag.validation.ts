import * as Yup from "yup";

export const TagValidationSchema = Yup.object().shape({
    name: Yup.string().required("Tên tag là bắt buộc")
});