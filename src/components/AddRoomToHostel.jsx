import { useState } from "react";
import api from "../api";
import { toast } from "sonner";

export default function AddRoom() {
    const [roomType, setRoomType] = useState("fixed");
    const [fixedRoomData, setFixedRoomData] = useState({
        floorNo: "",
        totalRooms: "",
        startRoomNo: "",
        totalSeatsInEachRoom: "",
    });

    const [variableRoomData, setVariableRoomData] = useState({
        floorNo: "",
        roomNo: "",
        totalSeatsInRoom: "",
    });

    const handleFixedChange = (e) => {
        setFixedRoomData({ ...fixedRoomData, [e.target.name]: e.target.value });
    };

    const handleVariableChange = (e) => {
        setVariableRoomData({ ...variableRoomData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (roomType === "fixed") {
            try {
                await api.post("/room/create/fixedSize",fixedRoomData);
                toast.success("Rooms created successfully! 🎉");
            } catch (error) {
                toast.error("Error creating rooms");
                console.error("Error creating rooms:", error);
            }
        } else {
            try {
                await api.post("/room/create",variableRoomData);
                toast.success("Rooms created successfully! 🎉");
            } catch (error) {
                toast.error("Error creating room");
                console.error("Error creating room:", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gray-900 text-white">
            <div className="max-w-lg w-full p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Add Room to Hostel</h1>

                {/* Room Type Selection */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg transition ${roomType === "fixed" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                            }`}
                        onClick={() => setRoomType("fixed")}
                    >
                        Fixed Size Room
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition ${roomType === "variable" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                            }`}
                        onClick={() => setRoomType("variable")}
                    >
                        Variable Size Room
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {roomType === "fixed" ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium">Floor Number</label>
                                <input
                                    type="number"
                                    name="floorNo"
                                    value={fixedRoomData.floorNo}
                                    onChange={handleFixedChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Total Rooms</label>
                                <input
                                    type="number"
                                    name="totalRooms"
                                    value={fixedRoomData.totalRooms}
                                    onChange={handleFixedChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Start Room Number</label>
                                <input
                                    type="number"
                                    name="startRoomNo"
                                    value={fixedRoomData.startRoomNo}
                                    onChange={handleFixedChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Total Seats in Each Room</label>
                                <input
                                    type="number"
                                    name="totalSeatsInEachRoom"
                                    value={fixedRoomData.totalSeatsInEachRoom}
                                    onChange={handleFixedChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium">Floor Number</label>
                                <input
                                    type="number"
                                    name="floorNo"
                                    value={variableRoomData.floorNo}
                                    onChange={handleVariableChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Room Number</label>
                                <input
                                    type="number"
                                    name="roomNo"
                                    value={variableRoomData.roomNo}
                                    onChange={handleVariableChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Total Seats in Room</label>
                                <input
                                    type="number"
                                    name="totalSeatsInRoom"
                                    value={variableRoomData.totalSeatsInRoom}
                                    onChange={handleVariableChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring focus:ring-blue-500"
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Add Room
                    </button>
                </form>
            </div>
        </div>
    );
}
