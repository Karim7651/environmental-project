import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Slider,
  Box,
  Grid,
  Paper,
  IconButton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import WarningIcon from "@mui/icons-material/Warning";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function CarbonFootprintCalculator() {
  const [naturalGas, setNaturalGas] = useState(50);
  const [electricity, setElectricity] = useState(100);
  const [heatingOil, setHeatingOil] = useState(150);
  const [propane, setPropane] = useState(200);
  const [coal, setCoal] = useState(250);
  const [biomass, setBiomass] = useState(300);
  const [efficiency, setEfficiency] = useState(100);
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [temperatureChange, setTemperatureChange] = useState(3.3); // Initial value
  const settings = {
    width: 250,
    height: 250,
    value: temperatureChange,
  };

  const initialValues = {
    naturalGas: 50,
    electricity: 100,
    heatingOil: 150,
    propane: 200,
    coal: 250,
    biomass: 300,
    efficiency: 85,
  };

  const emissionFactors = {
    naturalGas: 0.202,
    electricity: 0.233,
    heatingOil: 0.265,
    propane: 0.224,
    coal: 0.341,
    biomass: 0.1,
  };

  useEffect(() => {
    const footprint = calculateFootprint();
    setCarbonFootprint(footprint);
    const tempChange = calculateTemperatureChange(footprint);
    console.log(tempChange);
    setTemperatureChange(tempChange);
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, [naturalGas, electricity, heatingOil, propane, coal, biomass, efficiency]);

  const calculateFootprint = () => {
    const efficiencyFactor = efficiency / 100;
    return (
      (naturalGas * emissionFactors.naturalGas +
        electricity * emissionFactors.electricity +
        heatingOil * emissionFactors.heatingOil +
        propane * emissionFactors.propane +
        coal * emissionFactors.coal +
        biomass * emissionFactors.biomass) /
      efficiencyFactor
    );
  };
  const calculateTemperatureChange = (footprint) => {
    const maxFootprint = 853.13;
    const temperatureChange = (footprint / maxFootprint) * 2.5 + 2.5;
    return Math.round(temperatureChange * 100) / 100;
  };

  const resetValues = () => {
    setNaturalGas(initialValues.naturalGas);
    setElectricity(initialValues.electricity);
    setHeatingOil(initialValues.heatingOil);
    setPropane(initialValues.propane);
    setCoal(initialValues.coal);
    setBiomass(initialValues.biomass);
    setEfficiency(initialValues.efficiency);
  };

  const data = [
    {
      name: "Before",
      NaturalGas: 100,
      Electricity: 100,
      HeatingOil: 100,
      Propane: 100,
      Coal: 100,
      Biomass: 100,
      CarbonFootprint:
        (100 * 0.202 +
          100 * 0.233 +
          100 * 0.265 +
          100 * 0.224 +
          100 * 0.341 +
          100 * 0.1),
    },
    {
      name: "After",
      NaturalGas: naturalGas,
      Electricity: electricity,
      HeatingOil: heatingOil,
      Propane: propane,
      Coal: coal,
      Biomass: biomass,
      CarbonFootprint: carbonFootprint,
    },
  ];

  return (
    <Container
      sx={{
        width: "100vw",
        minHeight: "130vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom color="white">
        Environmental Impact Analysis
      </Typography>
      <Typography variant="h4" gutterBottom color="white">
        Carbon Footprint Calculator
      </Typography>
      <Grid container spacing={4} sx={{ width: "80%", maxWidth: 800 }}>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Natural gas is a fossil fuel used for heating, cooking, and electricity generation. Emission: 0.202 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <LocalGasStationIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Natural Gas Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={naturalGas}
            onChange={(e, newValue) => setNaturalGas(newValue)}
            aria-labelledby="natural-gas-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#8884d8" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Electricity consumption includes all electrical appliances and lighting. Emission: 0.233 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <ElectricBoltIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Electricity Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={electricity}
            onChange={(e, newValue) => setElectricity(newValue)}
            aria-labelledby="electricity-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#82ca9d" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Heating oil is used in boilers and furnaces for heating buildings. Emission: 0.265 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <OilBarrelIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Heating Oil Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={heatingOil}
            onChange={(e, newValue) => setHeatingOil(newValue)}
            aria-labelledby="heating-oil-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#ffc658" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Propane is a gas used for heating, cooking, and as fuel for engines. Emission: 0.224 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <FireplaceIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Propane Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={propane}
            onChange={(e, newValue) => setPropane(newValue)}
            aria-labelledby="propane-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#d0ed57" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Coal is a fossil fuel used primarily for electricity generation. Emission: 0.341 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <WhatshotIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Coal Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={coal}
            onChange={(e, newValue) => setCoal(newValue)}
            aria-labelledby="coal-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#a4de6c" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Biomass includes organic materials used for energy production. Emission: 0.1 kg CO2 per kWh">
              <IconButton sx={{ color: "white" }}>
                <SolarPowerIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Biomass Consumption (kWh)
            </Typography>
          </Box>
          <Slider
            value={biomass}
            onChange={(e, newValue) => setBiomass(newValue)}
            aria-labelledby="biomass-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={500}
            sx={{ color: "#ffcc00" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <MuiTooltip title="Efficiency of the energy usage. Higher efficiency means less carbon footprint.">
              <IconButton sx={{ color: "white" }}>
                <ElectricBoltIcon />
              </IconButton>
            </MuiTooltip>
            <Typography gutterBottom color="white">
              Efficiency (%)
            </Typography>
          </Box>
          <Slider
            value={efficiency}
            onChange={(e, newValue) => setEfficiency(newValue)}
            aria-labelledby="efficiency-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={80}
            max={100}
            sx={{ color: "#82ca9d" }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, mb: 2, width: "100%" }} className="chart-container">
        
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 6,
            borderRadius: "5px",
            color: "black",
          }}
          className={`animated ${animate ? "animated-text" : ""}`}
        >
          <Typography variant="h6">
            Carbon Footprint: {carbonFootprint.toFixed(2)} kg CO2
          </Typography>
        </Paper>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="10 10" stroke="#ffffff" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "none",
                color: "white",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="NaturalGas"
              stroke="#1f77b4"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Electricity"
              stroke="#ff7f0e"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="HeatingOil"
              stroke="#2ca02c"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Propane"
              stroke="#d62728"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Coal"
              stroke="#9467bd"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Biomass"
              stroke="#ffcc00"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="CarbonFootprint"
              stroke="#ffffff"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ pb: 3 }}>
            Temperature increase in degrees Celsius by 2100
          </Typography>
          <Gauge
            {...settings}
            valueMax={5.1}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                fill: "#ffffff",
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: temperatureChange > 3.3 ? "#ff0000" : "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
          />
          {temperatureChange > 3.3 ? (
            <WarningIcon sx={{ color: "#ff0000", fontSize: 40, pb: 6 }} />
          ) : (
            <EnergySavingsLeafOutlinedIcon
              sx={{ color: "#52b202", fontSize: 40, pb: 6 }}
            />
          )}
        </Box>
    </Container>
  );
}

export default CarbonFootprintCalculator;
