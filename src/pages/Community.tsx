import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface Post {
  id: string;
  user: string;
  title: string;
  likes: number;
  comments: number;
  image: string;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (!currentUser) return;

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: posts.find(p => p.id === postId)!.likes + 1
    });

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = async (postId: string) => {
    if (!currentUser) return;
    // Implement comment functionality
  };

  const handleShare = async (postId: string) => {
    // Implement share functionality
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Community</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-300 mb-4">by {post.user}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button onClick={() => handleComment(post.id)} className="flex items-center space-x-1 text-purple-500 hover:text-purple-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button onClick={() => handleShare(post.id)} className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;