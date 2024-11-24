import { useState, useEffect } from 'react';
import { EducationalResource } from '../models/EducationalResource';

// Assuming URL returns a structure that fits `EducationalResource` but with `publishedDate` as string
interface ResourceResponse extends Omit<EducationalResource, 'publishedDate'> {
    publishedDate: string;
}

const useFetchResources = (url: string) => {
    const [data, setData] = useState<EducationalResource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData: ResourceResponse[] = await response.json();
                const resources = jsonData.map(item => ({
                    ...item,
                    publishedDate: new Date(item.publishedDate) // Convert string to Date object
                }));
                setData(resources);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchResources;
