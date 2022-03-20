import styled from "styled-components";
import { useState, useRef } from "react";
import { themes } from "../../utils/variables";
import { useTheme, usePage, useHeader } from "../../utils/provider";
import { RiMvFill, RiHome2Fill, RiSettings4Fill } from "react-icons/ri";
import { MyText } from "../Text/index";
import { device } from "../../styles/mediaSizes";
import { useRouter } from "next/router";

