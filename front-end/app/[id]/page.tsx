'use client'
import { useParams } from "next/navigation"
import { io } from 'socket.io-client';

export default function something() {
    const { id } = useParams();
    console.log(`id is ${id}`);
    const socket = io(`http://localhost:4040/`);
    socket.emit('join-room', id, 10)
    return;
}