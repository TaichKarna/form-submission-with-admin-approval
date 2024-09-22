import { useState, useEffect } from "react"
import useUserStore from '../store/store'

export default function Profile(){
    const [submission, setSubmission] = useState(null);
    const { user } = useUserStore(state => state.user)
    const userData = useUserStore(state => state.user)
    console.log(user)
    useEffect(() => {
        const getFormData = async() => {
            const res = await fetch('/api/user-profile',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
                },
            });
            const data = await res.json();
            setSubmission(data.profile.submissions[0])
        }
        getFormData()
    },[])

    return(
        <div className=" mx-auto max-w-md">
            <div className="bg-white overflow-hidden shadow rounded-lg border p-4 sm:p-7 dark:bg-neutral-900 dark:text-white border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-white">
                        This is some information about the user.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        {
                            submission && (
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                                    {submission.formData["first-name"] + " " + submission.formData["last-name"]}
                                </dd>
                            </div>
                            )
                        }
                      
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-white">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                                {user.email}
                            </dd>
                        </div>
                        {
                            submission && (
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">
                                    Phone number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900  dark:text-white sm:mt-0 sm:col-span-2">
                                    +{submission.formData.phone}
                                </dd>
                            </div>
                            )
                        }
                        {
                            submission && (
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">
                                    Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                                    {submission.formData.address}
                                </dd>
                            </div>
                            )
                        }
                        {
                            submission && (
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-white">
                                    Form status
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                                    {submission.status}
                                </dd>
                            </div>
                            )
                        }
                    </dl>
                </div>
            </div>
        </div>
    )
}
