export type TAnnouncement = {
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdBy: string; // User ID who created the announcement
  userRole: string; // Role of the user who created the announcement
  isDeleted?: boolean;
};

export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};
