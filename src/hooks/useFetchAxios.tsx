import axios, { Method } from "axios";
import { useEffect, useState } from "react";

export default function useFetchAxios<T>(url: string, method: Method = "get", data?: any, headers?: Record<string, string>) {
	const [response, setResponse] = useState<T | null>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios({
					method: method,
					url: url,
					data: data,
					headers: {
						...headers,
					},
				});

				setResponse(res.data);
				setIsLoading(false);
			} catch (err: any) {
				setError(err.message || "Something wend wrong");
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, method, data, headers]);

	return { response, error, isLoading };
}
