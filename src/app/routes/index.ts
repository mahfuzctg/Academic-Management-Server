import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CourseRoutes } from '../modules/Course/course.route';

import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.route';
import { AcademicYearRoutes } from '../modules/AcademicYear/academicYear.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { JobRoutes } from '../modules/Job/job.route';
import { MarkDistributionRoutes } from '../modules/MarkDistribution/markDistribution.route';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route';
import { StudentRoutes } from '../modules/Student/student.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/academic-years',
    route: AcademicYearRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/mark-distribution',
    route: MarkDistributionRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/jobs',
    route: JobRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
