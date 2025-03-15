import Layout from "../../../../../Layouts/Layout";
import Nav from "../../../../../Components/App/Dashboard/Nav";
import BookingTable from "../../../../../Components/App/BookingTable";
import AddVenueForm from "../../../../../Components/App/Dashboard/Court/AddVenueForm";
import EditVenueForm from "../../../../../Components/App/Dashboard/Court/EditVenueForm";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../../../Context/AppContext";
import axios from "axios";

export default function ShowCourt() {
  const { user } = useContext(AppContext);
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (user?.id) {
      axios
        .get("/api/getMyVenues", {
          params: { user_id: user.id },
        })
        .then((response) => {
          setVenues(response.data);
          if (response.data.length > 0) {
            setSelectedVenue(response.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching venues:", error);
        });
    }
  }, [user]);

  const handleVenueChange = (event) => {
    const venueId = event.target.value;
    const selected = venues.find((venue) => venue.id === parseInt(venueId));
    console.log("selected", selected);
    setSelectedVenue(selected);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc muốn xóa sân này không?")) {
      try {
        await axios.delete(`/api/venues/${selectedVenue.id}`);
        const updatedVenues = venues.filter((venue) => venue.id !== selectedVenue.id);
        setVenues(updatedVenues);
        setSelectedVenue(updatedVenues.length > 0 ? updatedVenues[0] : null);
        alert("Xóa sân thành công!");
      } catch (error) {
        console.error("Error deleting venue:", error);
        alert("Có lỗi khi xóa sân!");
      }
    }
  };

  const handleAddVenue = () => {
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleSaveVenue = (newVenue) => {
    setVenues([...venues, newVenue]);
    setSelectedVenue(newVenue);
    setShowAddForm(false);
    alert("Thêm sân thành công!");
  };

  const handleSaveEdit = (updatedVenue) => {
    setVenues(venues.map((v) => (v.id === updatedVenue.id ? updatedVenue : v)));
    setSelectedVenue(updatedVenue);
    setShowEditForm(false);
    alert("Cập nhật sân thành công!");
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
  };

  return (
    <Layout>
      <Nav />
      <div className="container mx-auto px-4 py-8 mb-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản Lý Các Sân</h1>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          {venues.length > 0 ? (
            <>
              <div className="flex items-center space-x-4">
                <label htmlFor="venueSelect" className="font-medium text-gray-700">
                  Chọn sân:
                </label>
                <select
                  id="venueSelect"
                  value={selectedVenue?.id || ""}
                  onChange={handleVenueChange}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
                >
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddVenue}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
              >
                Thêm sân
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-gray-500">Không có sân nào.</p>
              <button
                onClick={handleAddVenue}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
              >
                Thêm sân
              </button>
            </div>
          )}
        </div>

        {showAddForm && (
          <AddVenueForm
            userId={user?.id}
            onSave={handleSaveVenue}
            onCancel={handleCancel}
          />
        )}

        {showEditForm && selectedVenue && (
          <EditVenueForm
            venueData={selectedVenue}
            onSave={handleSaveEdit}
            onCancel={handleCancel}
          />
        )}

        {selectedVenue && !showAddForm && !showEditForm && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedVenue.name}</h2>
              <div className="space-x-3">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                  Cập Nhật
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
            <BookingTable venue={selectedVenue} courtPrices={selectedVenue.courtPrices} />
          </div>
        )}
      </div>
    </Layout>
  );
}