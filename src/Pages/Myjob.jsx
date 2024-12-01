// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ClipLoader from "react-spinners/ClipLoader";
// import EditJobModal from "../components/EditJobModal";
// import ViewJobModal from "../components/ViewJobModal";
// import { Toaster } from "react-hot-toast";

// const Myjob = () => {
//   const email = localStorage.getItem("email");
//   const [jobs, setJobs] = useState([]);
//   const [originalJobs, setOriginalJobs] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [editingJob, setEditingJob] = useState(null);
//   const [viewingJob, setViewingJob] = useState(null);
//   const token = localStorage.getItem("token");

//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 5;

//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://job-portal-backend-nm6k.onrender.com/api/jobs/myJobs/${email}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setJobs(response.data);
//       setOriginalJobs(response.data);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [email]);

//   const handleSearch = () => {
//     const filteredJobs = originalJobs.filter((job) =>
//       job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setJobs(filteredJobs);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleEdit = (job) => {
//     setEditingJob(job);
//     setShowEditModal(true);
//   };

//   const handleView = (job) => {
//     setViewingJob(job);
//     setShowViewModal(true);
//   };

//   const handleDelete = async (jobId) => {
//     try {
//       await axios.delete(
//         `https://job-portal-backend-nm6k.onrender.com/api/jobs/delete-job/${jobId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const updatedJobs = jobs.filter((job) => job._id !== jobId);
//       setJobs(updatedJobs);
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} duration={4000} />
//       <div className="bg-navy min-h-screen max-w-screen  mx-auto xl:px-24 px-4">
//         <div className="my-jobs-container">
//           <h1 className="text-center p-4 text-2xl md:text-3xl font-bold">My Jobs</h1>
//           <div className="search-box text-center p-2">
//             <input
//               onChange={(e) => setSearchText(e.target.value)}
//               type="text"
//               name="search"
//               id="search"
//               onKeyPress={handleKeyPress}
//               placeholder="Search jobs..."
//               className="py-2 pl-3 border-2 shadow-md focus:outline-none lg:w-6/12 w-full mb-4"
//             />
//             <button
//               className="bg-blue-700 text-white shadow-md font-semibold px-6 py-2 rounded-sm mb-4 md:px-8 w-full md:w-auto"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="flex justify-center items-center h-32">
//                 <ClipLoader color="#000" size={50} />
//               </div>
//             ) : (
//               <table className="min-w-full bg-white border border-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Logo</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Job Title</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Company Name</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Location</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Salary</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Employment Type</th>
//                     <th className="py-2 px-2 md:px-4 border-b text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentJobs.map((job) => (
//                     <tr key={job._id} className="border-t">
//                       <td className="py-2 px-2 md:px-4 border-b text-center flex justify-center items-center">
//                         <img
//                           src={job.companyLogo}
//                           alt={`${job.companyName} logo`}
//                           className="w-8 h-8 md:w-10 md:h-10 object-cover"
//                         />
//                       </td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">{job.jobTitle}</td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">{job.companyName}</td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">{job.jobLocation}</td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">
//                         {job.minPrice} - {job.maxPrice}
//                       </td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">{job.employmentType}</td>
//                       <td className="py-2 px-2 md:px-4 border-b text-center">
//                         <button
//                           className="bg-yellow-500 text-white px-3 md:px-4 py-2 rounded mr-2"
//                           onClick={() => handleEdit(job)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="bg-red-500 text-white px-3 md:px-4 py-2 rounded"
//                           onClick={() => handleDelete(job._id)}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded ml-2"
//                           onClick={() => handleView(job)}
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           {/* Pagination Controls */}
//           <div className="pagination mt-4 flex justify-center items-center">
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="mx-2 px-3 py-2 border-2 shadow-2xl rounded font-semibold bg-white text-black hover:bg-gray-200 disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {Array.from(
//               { length: Math.ceil(jobs.length / jobsPerPage) },
//               (_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`mx-1 px-3 py-2 border-2 shadow-2xl rounded ${
//                     currentPage === index + 1
//                       ? "bg-blue-800 text-white"
//                       : "bg-white text-black hover:bg-gray-200"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               )
//             )}
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
//               className="mx-2 px-3 py-2 border-2 shadow-lg rounded bg-white text-black hover:bg-gray-200 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && (
//         <EditJobModal
//           job={editingJob}
//           onClose={() => setShowEditModal(false)}
//           onSave={fetchJobs}
//           fetchJobs={fetchJobs}
//         />
//       )}

//       {/* View Modal */}
//       {showViewModal && (
//         <ViewJobModal
//           job={viewingJob}
//           onClose={() => setShowViewModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Myjob;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import EditJobModal from "../components/EditJobModal";
import ViewJobModal from "../components/ViewJobModal";

const Myjob = () => {
  const email = localStorage.getItem("email");
  const [jobs, setJobs] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://job-portal-backend-nm6k.onrender.com/api/jobs/myJobs/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(response.data);
      setOriginalJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [email]);

  const handleSearch = () => {
    const filteredJobs = originalJobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredJobs);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowEditModal(true);
  };

  const handleView = (job) => {
    setViewingJob(job);
    setShowViewModal(true);
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(
        `https://job-portal-backend-nm6k.onrender.com/api/jobs/delete-job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} duration={4000} />
      <div className="bg-navy min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
            <div className="p-6 bg-white/10 border-b border-white/20">
              <h1 className="text-3xl font-extrabold text-black text-center">My Jobs</h1>
            </div>
            
            {/* Search Section */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    name="search"
                    id="search"
                    onKeyPress={handleKeyPress}
                    placeholder="Search jobs by title..."
                    className="w-full px-4 py-3 border-2 border-black/20 bg-white/10 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition duration-300 placeholder-gray-800"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                </div>
                <button
                  className="w-full sm:w-auto px-6 py-3  text-black rounded-lg bg-specialtext hover:bg-yellow-500  transition duration-300 flex items-center justify-center gap-2 font-semibold"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" /> Search
                </button>
              </div>

              {/* Job Table */}
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-white/10">
                      <tr>
                        {["Logo", "Job Title", "Company", "Location", "Salary", "Type", "Actions"].map((header) => (
                          <th key={header} className="px-4 py-3 text-left text-xs font-medium text-black/70 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {currentJobs.map((job) => (
                        <tr key={job._id} className="hover:bg-white/5 transition duration-150">
                          <td className="px-4 py-4">
                            <img
                              src={job.companyLogo}
                              alt={`${job.companyName} logo`}
                              className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20"
                            />
                          </td>
                          <td className="px-4 py-4 text-sm text-black">{job.jobTitle}</td>
                          <td className="px-4 py-4 text-sm text-black/70">{job.companyName}</td>
                          <td className="px-4 py-4 text-sm text-black/70">{job.jobLocation}</td>
                          <td className="px-4 py-4 text-sm text-green-700">
                            {job.minPrice} - {job.maxPrice}
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                              {job.employmentType}
                            </span>
                          </td>
                          <td className="px-4 py-4 flex space-x-2">
                            <button
                              onClick={() => handleEdit(job)}
                              className="text-yellow-700 bg-yellow-300 hover:bg-yellow-500/20 p-2 rounded-full transition duration-300"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="text-red-700 bg-red-300 hover:bg-red-500/20 p-2 rounded-full transition duration-300"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleView(job)}
                              className="text-blue-700 bg-blue-300 hover:bg-blue-500/20 p-2 rounded-full transition duration-300"
                              title="View"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-white/10 border border-white/20 text-black/70 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from(
                  { length: Math.ceil(jobs.length / jobsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-black"
                          : "bg-white/10 text-black/70 hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
                  className="p-2 rounded-full bg-white/10 border border-white/20 text-black/70 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditJobModal
          job={editingJob}
          onClose={() => setShowEditModal(false)}
          onSave={fetchJobs}
          fetchJobs={fetchJobs}
        />
      )}

      {/* View Modal */}
      {showViewModal && (
        <ViewJobModal
          job={viewingJob}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
};

export default Myjob;