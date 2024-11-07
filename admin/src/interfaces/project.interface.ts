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
    description: string,
}

export interface ICreateANewProject {
    title: string;
    link_Youtube_URL: string,
    link_demo_project: string,
    link_img_banner: string,
    year: number,
    grade: number,
    faculty: string,
    campus: string,
    teacher_name: string,
    teacher_id: string,
    student_name: string,
    student_id: string,
    file_report_URL: string,
    description: string, 
    tags: string[];
    images: [],
}