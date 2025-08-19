import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { toast } from "sonner";

export default function RoomAssignment() {
    const [rooms, setRooms] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [roomSearch, setRoomSearch] = useState("");
    const [studentSearch, setStudentSearch] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get("/room/byFloor/1");
                setRooms(response.data);
            } catch (err) {
                console.log("Failed to load applications.");
            }
        };
        const fetchStudents = async () => {
            try {
                const response = await api.get("room/getStudents/withoutRoom");
                setStudents(response.data);
            } catch (err) {
                console.log("Failed to load applications.");
            }
        };

        fetchRooms();
        fetchStudents();
    }, []);

    const handleClick = async () => {
        try {
            await api.post("/room/addStudent",{"room_id":selectedRoom.roomId,"std_id":selectedStudent.studentId});
            toast.success("Room alloted successfully");
        } catch (error) {
            toast.error("Error in Room alloting");
            console.error("Error creating rooms:", error);
        }
    };

    return (
        <div className="flex bg-gray-900 justify-center text-white min-h-screen">
        <div className="grid grid-cols-2 p-6 gap-6">
            {/* Left Side - Rooms */}
            <div>
                <h1 className="text-2xl font-bold mb-4">Rooms</h1>
                <Input
                    type="text"
                    placeholder="Search rooms..."
                    value={roomSearch}
                    onChange={(e) => setRoomSearch(e.target.value)}
                    className="mb-2"
                />
                <div className="space-y-2">
                    {rooms.filter(room => room.roomNo.toString().includes(roomSearch)).slice(0, 5).map((room) => (
                        <Card
                            key={room.roomId}
                            className={`p-4 bg-gray-800 cursor-pointer hover:shadow-lg transition-all ${selectedRoom?.roomId === room.roomId ? 'border-2 border-blue-500' : ''}`}
                            onClick={() => setSelectedRoom(room)}
                        >
                            <p className="text-lg text-white font-semibold">Room {room.roomNo}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right Side - Students */}
            <div>
                <h1 className="text-2xl font-bold mb-4">Students</h1>
                <Input
                    type="text"
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="mb-2"
                />
                <div className="space-y-2">
                {students.filter(student => student.studentName.toLowerCase().includes(studentSearch.toLowerCase())).slice(0, 5).map((student) => (
                        <Card
                            key={student.studentId}
                            className={`p-4 cursor-pointer bg-gray-800 hover:shadow-lg transition-all ${selectedStudent?.studentId === student.studentId ? 'border-2 border-green-500' : ''}`}
                            onClick={() => setSelectedStudent(student)}
                        >
                            <p className="text-lg text-white font-semibold">{student.studentName}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Assign Button */}
            <div className="col-span-2 flex justify-center mt-1">
                <Button
                    className="bg-blue-600 rounded-lg text-white disabled:opacity-50 px-6 py-2"
                    disabled={!selectedRoom || !selectedStudent}
                    onClick={() => handleClick()}
                >
                    Assign
                </Button>
            </div>
        </div>
        </div>
    );
}