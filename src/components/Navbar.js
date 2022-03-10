import {
  Button,
  Stack,
  Grid,
  Box,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { Search, Menu, Clear } from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function Nav({ props }) {
  if (props.nav) {
    return <>{props.nav}</>;
  } else {
    return <></>;
  }
  // props.wid <= 768 ? console.log(props.wid) : console.log("sadf");
}
export default function Navbar() {
  const router = useRouter();
  const [ham, setHam] = useState(false);
  const handleHamburger = (e) => {
    e.preventDefault();
    setHam(true);
  };
  const backHamburger = (e) => {
    e.preventDefault();
    console.log(e.target.href);
    if (e.target.href !== undefined) {
      router.push(e.target.href);
      setHam(false);
    } else {
      setHam(false);
    }
  };
  return (
    <Box className="nav">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="py-4 px-32 flex navbar navbar_desktop"
      >
        <Stack sx={{ flex: 4, display: "flex" }} className="flex-row relative ">
          <Link href="/">
            <a className="mr-7 relative h-14 w-24 flex items-center">
              <img src="/img/sealjet-logo.png" alt="sealjet_logo" />
            </a>
          </Link>
          <div className="flex">
            <Link href="/">
              <a className="mx-7 font-medium flex items-center text-white">
                Нүүр
              </a>
            </Link>
            <Link href="/product">
              <a className="mx-7 font-medium flex items-center text-white">
                Бүтээгдэхүүн
              </a>
            </Link>
            <Link href="/material">
              <a className="mx-7 font-medium flex items-center text-white">
                Материал
              </a>
            </Link>

            <Link href="/info">
              <a className="mx-7 font-medium flex items-center text-white">
                Мэдээ
              </a>
            </Link>
            <Link href="/#contacts">
              <a className="mx-7 font-medium flex items-center text-white">
                Холбоо
              </a>
            </Link>
          </div>

          {/* <Link href="/order">
            <a className="mx-7 font-medium flex items-center text-white">
              Захиалах
            </a>
          </Link> */}
        </Stack>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            flex: 1,
          }}
          className="search"
        >
          <IconButton type="submit" aria-label="search" className="p-0 pl-2">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Бүтээгдэхүүн хайх"
            inputProps={{ "aria-label": "searchh product" }}
          />
        </Paper>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="py-4 px-32 flex navbar navbar_mobile"
      >
        <div className="flex-1 justify-start flex" onClick={handleHamburger}>
          <IconButton className=" text-white hamburger">
            <Menu />
          </IconButton>
        </div>
        {ham && (
          <div className="absolute top-0 left-0 z-40 w-2/5 bg">
            <div className="relative flex flex-col py-6">
              <Link href="/">
                <a
                  onClick={backHamburger}
                  className="mx-7 py-2 font-medium flex items-center text-white"
                >
                  Нүүр
                </a>
              </Link>
              <Link href="/product">
                <a
                  onClick={backHamburger}
                  className="mx-7 py-2  font-medium flex items-center text-white"
                >
                  Бүтээгдэхүүн
                </a>
              </Link>
              <Link href="/material">
                <a
                  onClick={backHamburger}
                  className="mx-7 font-medium py-2  flex items-center text-white"
                >
                  Материал
                </a>
              </Link>

              <Link href="/info">
                <a
                  onClick={backHamburger}
                  className="mx-7 font-medium flex py-2  items-center text-white"
                >
                  Мэдээ
                </a>
              </Link>
              <Link href="/#contacts">
                <a
                  onClick={backHamburger}
                  className="mx-7 font-medium flex items-center py-2  text-white"
                >
                  Холбоо
                </a>
              </Link>
              <span className="absolute right-2 top-2 ">
                <IconButton onClick={backHamburger} className="text-white">
                  <Clear />
                </IconButton>
              </span>
            </div>
          </div>
        )}
        <Link href="/" className="flex-1">
          <a className="mr-7 relative h-14 w-24 flex items-center ">
            <img src="/img/sealjet-logo.png" alt="sealjet_logo" />
          </a>
        </Link>

        {/* <Link href="/order">
            <a className="mx-7 font-medium flex items-center text-white">
              Захиалах
            </a>
          </Link> */}
        <IconButton
          type="submit"
          aria-label="search"
          className="p-0 pl-2 flex-1 text-white flex justify-end"
        >
          <Search />
        </IconButton>
        {/* <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            flex: 1,
          }}
          className="search"
        >
          <IconButton type="submit" aria-label="search" className="p-0 pl-2">
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Бүтээгдэхүүн хайх"
            inputProps={{ "aria-label": "searchh product" }}
          />
        </Paper> */}
      </Stack>
    </Box>
  );
}
