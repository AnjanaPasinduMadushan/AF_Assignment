import create from "zustand";
import axios from "axios";

const complaintsStore = create((set) => ({
  complaints: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  fetchComplaints: async () => {
    // Fetch the complaints
    const res = await axios.get("http://localhost:3000/complaints");

    // Set to state
    set({ complaints: res.data.complaints });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createComplaint: async (e) => {
    e.preventDefault();

    const { createForm, complaints } = complaintsStore.getState();
    const res = await axios.post(
      "http://localhost:3000/complaints",
      createForm
    );

    set({
      complaints: [...complaints, res.data.complaint],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteComplaint: async (_id) => {
    // Delete the complaint
    const res = await axios.delete(`http://localhost:3000/complaints/${_id}`);
    const { complaints } = complaintsStore.getState();

    // Update state
    const newComplaints = complaints.filter((complaint) => {
      return complaint._id !== _id;
    });

    set({ complaints: newComplaints });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateForm: {
        title,
        body,
        _id,
      },
    });
  },

  updatenewComplaint: async (e) => {
    e.preventDefault();

    const {
      updateForm: { title, body, _id },
      complaints,
    } = complaintsStore.getState();

    // Send the update request
    const res = await axios.put(`http://localhost:3000/complaints/${_id}`, {
      title,
      body,
    });

    // Update state
    const newComplaints = [...complaints];
    const complaintIndex = complaints.findIndex((complaint) => {
      return complaint._id === _id;
    });
    newComplaints[complaintIndex] = res.data.complaint;

    set({
      complaints: newComplaints,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
}));

export default complaintsStore;
