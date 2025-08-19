import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";    
import api from "../api";

export default function RoomGrid() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get("/room/byFloor/1");
                setRooms(response.data);
            } catch (err) {
                console.log("Failed to load applications.");
            }
        };
        fetchDetails();
    }, []);
    return (
        <div className="min-h-screen flex justify-center bg-gray-900 text-white">
            <div className="max-w-lg w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Rooms</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                    <Card
                        key={room.roomId}
                        className="p-4 bg-gray-800 text-white cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => setSelectedRoom(room)}
                    >
                        <p className="text-lg text-center font-semibold">{room.roomNo}</p>
                    </Card>
                ))}
            </div>

            {/* Dialog for Room Details */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          {selectedRoom && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Room {selectedRoom.roomNo}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p>Floor: {selectedRoom.floorNo}</p>
                <p>Total Seats: {selectedRoom.totalSeats}</p>
                <p>Empty Seats: {selectedRoom.emptySeats}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
        </div>
        </div>
    );
}
