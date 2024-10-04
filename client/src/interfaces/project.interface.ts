

export interface IProject{
    _id: string | null;
    title: string;
    link_Youtube_URL: string,
    year: number,
    grade: number,
    faculty: string,
    campus: string,
    teacher_name: string,
    teacher_id: string,
    student_name: string,
    student_id: string,
    link_demo_project: string,
    link_img_banner: string,
    description: string,

}

export interface ICreateANewProject{
    title: string;
    link_Youtube_URL: string,
    link_demo_project: string,
    year: number,
    grade: number,
    faculty: string,
    campus: string,
    teacher_name: string,
    teacher_id: string,
    student_name: string,
    student_id: string,
    description: string,
}