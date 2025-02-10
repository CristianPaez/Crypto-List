import { useEffect, useState } from "react";
import { ICrypto } from "@/src/domain/models/crypto.model";
import CryptoService from "@/src/domain/services/crypto.service";

// Type for the return value of the useCryptoList hook
type CryptoListReturnHook = {
  cryptos: ICrypto[];
  loading: boolean;
  search: string;
  handleSearch: (value: string) => void;
};

// Custom hook that handles fetching, filtering and searching cryptocurrencies
export const useCryptoList = (): CryptoListReturnHook => {
  const [cryptos, setCryptos] = useState<ICrypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<ICrypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await CryptoService.getCryptos();
        setCryptos(data.data);
        setFilteredCryptos(data.data);
      } catch (error) {
        console.error("Error loading cryptos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    setFilteredCryptos(
      cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return {
    cryptos: filteredCryptos,
    loading,
    search,
    handleSearch,
  };
};
