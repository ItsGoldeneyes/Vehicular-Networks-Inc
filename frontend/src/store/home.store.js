import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// interface HomeState {
//   isLoading: boolean;
//   error: any;
//   response: Object[];
//   input: string;
//   stockOptions: { name: string; symbol: string }[];
//   stockOptionsError: boolean;
// }

const initialState = {
  isLoading: false,
  error: false,
  response: [],
  input: [],
  userAllTickets: [],
  agentAllTickets: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    saveInput: (state, input) => {
      state.input.push(input.payload);
    },
    clearResponseAndInput: (state) => ({
      ...state,
      error: false,
      response: [],
      input: [],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(submitNewTicket.pending, (state, action) => {
      state.isLoading = true;
    });
    // No response, action.payload will be the reponse.json()
    builder.addCase(submitNewTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response.push(action.payload.result);
    });
    builder.addCase(submitNewTicket.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = true;
    });

    // Get User Tickets
    builder.addCase(getUserAllTickets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAllTickets.fulfilled, (state, action) => {
      state.userAllTickets = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAllTickets.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Get Agent Tickets
    builder.addCase(getAgentAllTickets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAgentAllTickets.fulfilled, (state, action) => {
      state.agentAllTickets = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAgentAllTickets.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// Async actions to fetch prediction from api
// Docs: https://www.youtube.com/watch?v=2JBx_06dD1k&t=817s
export const submitNewTicket = createAsyncThunk(
  "submitNewTicket",
  async (data) => {
    return await fetch(
      "https://ticket-system-backend-hsoh.onrender.com/createTicket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        // handle success (200-209) and custom server error 406
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        // Throw error if flask throws an error
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

export const getUserAllTickets = createAsyncThunk(
  "getUserAllTickets",
  async (data) => {
    return await fetch(
      "https://ticket-system-backend-hsoh.onrender.com/getUserAllTickets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        // handle success (200-209) and custom server error 406
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        // Throw error if flask throws an error
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

export const getAgentAllTickets = createAsyncThunk(
  "getAgentAllTickets",
  async (data) => {
    return await fetch(
      "https://ticket-system-backend-hsoh.onrender.com/getAgentAllTickets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        // handle success (200-209) and custom server error 406
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        // Throw error if flask throws an error
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

export const { saveInput, clearResponseAndInput } = homeSlice.actions;

export default homeSlice.reducer;
