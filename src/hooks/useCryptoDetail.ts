import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ICrypto } from "@/src/domain/models/crypto.model";
import CryptoService from "@/src/domain/services/crypto.service";

// Type for the return value of the useCryptoDetail hook
type CryptoDetailReturnHook = {
  crypto: ICrypto | undefined;
  loading: boolean;
};

// Custom hook that manages fetching and displaying single cryptocurrency data
export const useCryptoDetail = (): CryptoDetailReturnHook => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [crypto, setCrypto] = useState<ICrypto | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        setLoading(true);
        const data = await CryptoService.getCryptoById(id as string);
        setCrypto(data);
      } catch (error) {
        console.error("Error loading crypto:", error);
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, [id]);

  return {
    crypto,
    loading,
  };
};
