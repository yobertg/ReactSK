import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useChartData } from "@/Utils/Hooks/useChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const { data = {}, isLoading } = useChartData();

  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = data;

  if (isLoading)
    return <div className="p-6 text-center">Loading chart data...</div>;

  return (
    <main className="flex-1 p-6 space-y-12">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* 1. BarChart - Mahasiswa per Fakultas */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Jumlah Mahasiswa per Fakultas
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={students}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="faculty" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 2. PieChart - Rasio Gender */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Rasio Gender</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderRatio}
                dataKey="count"
                nameKey="gender"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {genderRatio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. LineChart - Pendaftaran Mahasiswa */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Pendaftaran Mahasiswa per Tahun
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={registrations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. RadarChart - Distribusi Nilai */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          Distribusi Nilai per Mata Kuliah
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={gradeDistribution}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="A"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="B"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.4}
              />
              <Radar
                name="C"
                dataKey="C"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 5. AreaChart - Jumlah Dosen per Pangkat */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Pangkat Dosen</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lecturerRanks}>
              <defs>
                <linearGradient id="colorLecturer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="rank" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorLecturer)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;