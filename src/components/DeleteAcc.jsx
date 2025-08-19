import { useState } from "react";

export default function DeleteAccount() {
    const [showDialog, setShowDialog] = useState(false);

    const handleDelete = () => {
        setShowDialog(false);
        console.log("Account Deleted"); // Replace with actual delete API call
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="max-w-md w-full p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Delete Account</h1>
                <p className="text-center text-gray-400 mb-6">
                    Deleting your account is permanent and cannot be undone. Are you sure?
                </p>

                <button
                    onClick={() => setShowDialog(true)}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition"
                >
                    Delete My Account
                </button>
            </div>

            {/* Confirmation Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-red-500 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-400 mb-6">Are you absolutely sure you want to delete your account?</p>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
