import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

type Note = {
  user: any;
  title: string;
  text: string;
  completed: boolean;
  id: string;
  _id: string;
};

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      transformResponse: (responseData: Note[]) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, err, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "List" },
            ...result.ids.map((id) => ({ type: "Note" as const, id })),
          ];
        } else return [{ type: "Note", id: "List" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

export const selectUsersResult =
  notesApiSlice.endpoints.getNotes.select("notes");
const selectNotesData = createSelector(
  selectUsersResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state: any) => selectNotesData(state) ?? initialState
);
