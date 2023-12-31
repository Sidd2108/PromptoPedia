"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchposts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) fetchposts();
    }, [])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = (post) => {

    }
    return (
        <Profile
            name="My"
            desc="Welcome to your profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile