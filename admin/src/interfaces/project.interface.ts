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
    youtubeURL: string;
    demoProjectURL: string;
    year: number;
    grade: number;
    faculty: string;
    campus: string;
    teacherName: string;
    teacherId: string;
    studentName: string;
    studentId: string;
    description: string;
    link_img_banner: string;
    images?: string[]; 
    tags?: string[];    
}