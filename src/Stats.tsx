import { Box, Container } from "@mui/material";
import axios from "./apis/httpreq";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

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
        console.log(`Why is this not called${data}`);
        setTicketStats({
          total_tickets: data.ticket_count,
          open_tickets: data.open_tickets,
          closed_tickets: data.closed_tickets,
          pending_tickets: data.in_progress,
        });
      } else {
        console.error("Login failed");
        toast.error("Incorrect staff ID or password. Please try again.", {
          theme: "dark",
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const fetchDepartmentStats = async () => {
    try {
      const response = await axios.get(`/app/ticket/stats/department`);

      if (response.status === 200) {
        const data = response.data;
        console.log(`Why is this not called${data}`);
        setDepartmentStats({
          department_name: data.department_name,
          ticket_count: data.department_total_tickets,
          open_tickets: data.department_total_closed_tickets,
          closed_tickets: data.department_total_open_tickets,
          in_progress: data.department_total_in_progress_tickets,
        });

        console.log(departmentStats);
      } else {
        console.error("Login failed");
        toast.error("Incorrect staff ID or password. Please try again.", {
          theme: "dark",
        });
      }
      setLoadingLine(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <Container>
      <Box>
        <h1 className="text-2xl font-semibold mb-4">Ticket Stats</h1>
        <p className="text-gray-500 mb-4">
          Total Tickets: {ticketStats?.total_tickets}
        </p>
        {!loading && (
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
            height={200}
          />
        )}
      </Box>

      <Box sx={{ marginTop: "100px" }}>
        {!loadingLine && (
          <BarChart
            xAxis={[
              { scaleType: "band", data: departmentStats.department_name },
            ]}
            series={[
              {
                data: departmentStats.ticket_count,
                label: "Total Tickets",
              },
              {
                data: departmentStats.open_tickets,
                label: "Open tickets",
              },
              {
                data: departmentStats.closed_tickets,
                label: "Closed Tickets",
              },
              {
                data: departmentStats.in_progress,
                label: "In Progress",
              },
            ]}
            width={1000}
            height={400}
          />
        )}
      </Box>
    </Container>
  );
}
