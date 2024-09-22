import { useState } from "react";
import useUserStore from "../store/store";

function TableRow({formId,formData, status,setRender}){
    const [statusForm, setStatusForm] = useState(status);
    const { user } = useUserStore(state => state.user)
    
    const approveForm = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/form-submission/${id}/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.idToken}` // Replace with actual JWT token
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStatusForm("Approved");
                window.location.reload()
                console.log("Form approved successfully:", data);
            } else {
                console.error("Failed to approve form submission");
            }
        } catch (error) {
            console.error("Error approving form submission:", error);
        }
    };

    const rejectForm = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/form-submission/${id}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.idToken}` // Replace with actual JWT token
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStatusForm("Rejected")
                window.location.reload()
                console.log("Form rejected successfully:", data);
            } else {
                console.error("Failed to reject form submission");
            }
        } catch (error) {
            console.error("Error rejecting form submission:", error);
        }
    };

    return(
        <tr>
        <td className="px-6 py-3 whitespace-nowrap">
            <div className="flex items-center gap-x-3">
                <div className="grow">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{formId}</span>
                </div>
            </div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
            <div className="flex items-center gap-x-3">
                <div className="grow">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        {formData["first-name"] + " " + formData["last-name"]}</span>
                </div>
            </div>
        </td>
        <td className="px-6 py-3 whitespace-nowrap">
            <div className="flex items-center gap-x-3">
                <div className="grow">
                    <span className="block text-sm  text-gray-800 dark:text-neutral-200">{formData.email}</span>
                </div>
            </div>
        </td>

        <td className="px-6 py-3 whitespace-nowrap">
            <span className="block text-sm  text-gray-800 dark:text-neutral-200">{formData.phone}</span>
        </td>

        {
            status === 'pending'? (
            <td className="px-6 py-3 whitespace-nowrap">
                <div className="flex gap-x-2">
                    <button
                        className="py-1 px-2 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700"
                        onClick={() => approveForm(formId)} 
                    >
                        Approve
                    </button>

                    <button
                        className="py-1 px-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                        onClick={() => rejectForm(formId)} 
                    >
                        Reject
                    </button>
                </div>
            </td>
            ): (
                <td className="px-6 py-3 whitespace-nowrap">
                {
                    status === 'approved'? (
                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                        {statusForm}
                    </span>
                    ): (
                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-red-400">
                        {statusForm}
                    </span>
                    )
                }
            </td>
            )
        }

    </tr>
    )
}

export default function UserTable({data}){
    const [render, setRender] = useState(Math.random());


    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        User Submissions
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                                        Approve or reject submission.
                                    </p>
                                </div>

                            </div>

                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800">
                                    <tr>

                                    <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                    Form Id
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                    Name
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                    Email
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                    Phone
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-start">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                                    Status
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-end"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {data && data.length > 0 && data.map( tr => 
                                    <TableRow 
                                        formId={tr.id} 
                                        formData={tr.formData} 
                                        status={tr.status} 
                                        key={tr.id}
                                        setRender={setRender}
                                    />)}
                                </tbody>
                            </table>

                            <div className="px-6 py-4 border-t border-gray-200 dark:border-neutral-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700 dark:text-neutral-200">
                                        {/* Page 1 of 10 */}
                                    </span>

                                    <div className="inline-flex gap-x-2">
                                        <a className="py-2 px-3 inline-flex items-center justify-center gap-x-1 text-sm font-medium rounded-md border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-900" href="#">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </a>

                                        <a className="py-2 px-3 inline-flex items-center justify-center gap-x-1 text-sm font-medium rounded-md border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-900" href="#">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
