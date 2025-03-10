import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import DMList from "./components/DMList";
import FilterOptions from "./components/FilterOptions";
import Settings from "./components/Settings";

function App() {
  const [dms, setDMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priority: "",
    isSpam: null,
    searchTerm: "",
  });

  useEffect(() => {
    const fetchDMs = async () => {
      try {
        const response = await axios.get(
          "https://linkedin-dmorganiser.vercel.app/api/dms"

          //"http://localhost:4000/api/dms"
        );
        setDMs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDMs();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const updateDM = async (id, updates) => {
    try {
      await axios.patch(
        `https://linkedin-dmorganiser.vercel.app/api/dms/${id}`,
        //`http://localhost:4000/api/dms/${id}`,

        updates
      );
      // Optimistically update the state
      setDMs(dms.map((dm) => (dm._id === id ? { ...dm, ...updates } : dm)));
    } catch (error) {
      console.error("Error updating DM:", error);
    }
  };

  const filteredDMs = dms.filter((dm) => {
    console.log("DM Priority:", dm.priority); // Debugging: Check stored priority values

    if (filters.priority && dm.priority !== filters.priority) {
      return false;
    }
    if (filters.isSpam !== null && dm.isSpam !== filters.isSpam) {
      return false;
    }
    if (
      filters.searchTerm &&
      !dm.sender.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !dm.message.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <h2>Error: {error}</h2>
      </Container>
    );
  }

  return (
    <Container>
      <h1>LinkedIn DM Organizer</h1>
      <Row>
        <Col md={4}>
          <FilterOptions
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          {/* <Settings /> */}
        </Col>
        <Col md={8}>
          <DMList dms={filteredDMs} updateDM={updateDM} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
