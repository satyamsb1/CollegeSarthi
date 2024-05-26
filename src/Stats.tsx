import { Box, Container, Typography, CircularProgress } from "@mui/material";
import axios from "./apis/httpreq";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, PieChart } from "@mui/x-charts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Custom theme with Inter font
const theme = createTheme({
  typography: {
    fontFamily: "Inter, Arial",
  },
});

interface TicketStats {
  total_tickets: number;
  open_tickets: number;
  closed_tickets: number;
  pending_tickets: number;
}

interface DepartmentStats {
  department_name: string[];
  ticket_count: number[];
  open_tickets: number[];
  closed_tickets: number[];
  in_progress: number[];
}

export default function Stats() {
  const [ticketStats, setTicketStats] = useState<TicketStats>();
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats>();
  const [loading, setLoading] = useState(true);
  const [loadingLine, setLoadingLine] = useState(true);

  useEffect(() => {
    fetchTicketStats();
    fetchDepartmentStats();
  }, []);

  const fetchTicketStats = async () => {
    try {
      const response = await axios.get(`/app/ticket/stats/count`);
      if (response.status === 200) {
        const data = response.data;
        setTicketStats({
          total_tickets: data.ticket_count,
          open_tickets: data.open_tickets,
          closed_tickets: data.closed_tickets,
          pending_tickets: data.in_progress,
        });
      } else {
        toast.error("Failed to fetch ticket stats.", { theme: "dark" });
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  const fetchDepartmentStats = async () => {
    try {
      const response = await axios.get(`/app/ticket/stats/department`);
      if (response.status === 200) {
        const data = response.data;
        setDepartmentStats({
          department_name: data.department_name,
          ticket_count: data.department_total_tickets,
          open_tickets: data.department_total_closed_tickets,
          closed_tickets: data.department_total_open_tickets,
          in_progress: data.department_total_in_progress_tickets,
        });
      } else {
        toast.error("Failed to fetch department stats.", { theme: "dark" });
      }
      setLoadingLine(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoadingLine(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ticket Statistics
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Total Tickets: {ticketStats?.total_tickets}
        </Typography>

        <Box
          sx={{
            padding: 4,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
            mb: 4,
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Ticket Distribution
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: ticketStats.closed_tickets,
                      label: "Closed Tickets",
                    },
                    {
                      id: 1,
                      value: ticketStats.open_tickets,
                      label: "Open Tickets",
                    },
                    {
                      id: 2,
                      value: ticketStats.pending_tickets,
                      label: "Pending Tickets",
                    },
                  ],
                },
              ]}
              width={600}
              height={300}
            />
          )}
        </Box>

        <Box
          sx={{
            padding: 4,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Department-wise Ticket Stats
          </Typography>
          {loadingLine ? (
            <CircularProgress />
          ) : (
            <BarChart
              xAxis={[
                { scaleType: "band", data: departmentStats.department_name },
              ]}
              series={[
                { data: departmentStats.ticket_count, label: "Total Tickets" },
                { data: departmentStats.open_tickets, label: "Open Tickets" },
                {
                  data: departmentStats.closed_tickets,
                  label: "Closed Tickets",
                },
                { data: departmentStats.in_progress, label: "In Progress" },
              ]}
              width={1000}
              height={400}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
