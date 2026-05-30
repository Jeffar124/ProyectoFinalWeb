import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../Firebase/config.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, 'usuarios', currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser({ uid: currentUser.uid, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error al obtener el documento del usuario:", error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar la autenticación fácilmente
export const useAuth = () => useContext(AuthContext);