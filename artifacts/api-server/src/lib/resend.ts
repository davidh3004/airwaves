import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

const LOGO_B64 =
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjExIDk3IDI0NS44IDY2Ij4KCiAgCiAgPHBhdGggZD0ibTkwLjkgMTI4LjggNC40LTE0LjhoMS43bDQuMyAxNC43aC0yLjdsLTAuOC0zLjd2MC4xaC0zLjhsLTAuOC0wLjEtMC45IDMuOGgtMS40em0zLjktNS45aDIuMmMwLjEgMCAwLTAuMSAwLTAuMWwtMS4xLTUuOC0xLjEgNS45IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIxMDIuMiAxMjguOCAxMDMuNyAxMjguOCAxMDMuNyAxMTYuNyAxMDIuMiAxMTYuNyIgZmlsbD0icmdiKDAsIDE3NCwgMjM5KSIvPgogIDxwYXRoIGQ9Im0xMDUuNyAxMjguOHYtMTEuOGg1LjRjMC44IDAgMS40IDAuOCAxLjQgMi4xdjIuOWMwIDEuMy0wLjYgMi4yLTEuNCAyLjJoLTAuOGwyLjcgNC41aC0yLjlsLTIuNS00LjVoLTEuNHY0LjVsLTAuNSAwLjF6bTQuMS02LjdjMC44IDAgMS4yLTAuMSAxLjItMS4xdi0xLjFjMC0wLjgtMC40LTAuOS0xLjItMC45aC0yLjZ2My4xaDIuNnoiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cG9seWdvbiBwb2ludHM9IjExNS40IDEyOC44IDExMi45IDExMy45IDExNC43IDExMy45IDExNi4zIDEyNCAxMTguNCAxMTMuOSAxMTkuNiAxMTMuOSAxMjEuNiAxMjQgMTIzLjMgMTEzLjkgMTI1IDExMy45IDEyMi41IDEyOC44IDEyMS4yIDEyOC44IDExOSAxMTguNSAxMTYuOSAxMjguOCIgZmlsbD0icmdiKDAsIDE3NCwgMjM5KSIvPgogIDxwYXRoIGQ9Im0xMjQgMTI4LjggMy4zLTEyLjFoMS43bDMuNCAxMmgtMS44bC0wLjYtMi44aC0zLjVsLTAuNiAyLjhoLTEuOXYwLjF6bTIuNy01aDIuN2wtMS4zLTQuOS0xLjQgNC45eiIgZmlsbD0icmdiKDAsIDE3NCwgMjM5KSIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTM1LjYgMTI4LjggMTMyLjIgMTE2LjcgMTMzLjkgMTE2LjcgMTM2LjMgMTI1LjMgMTM4LjggMTE2LjcgMTQwLjIgMTE2LjcgMTM2LjYgMTI4LjgiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cG9seWdvbiBwb2ludHM9IjE0MC44IDEyOC44IDE0MC44IDExNi43IDE0NyAxMTYuNyAxNDcgMTE4LjkgMTQyLjMgMTE4LjkgMTQyLjMgMTIxLjUgMTQ0LjkgMTIxLjUgMTQ0LjkgMTIzLjUgMTQyLjMgMTIzLjUgMTQyLjMgMTI2LjQgMTQ2LjkgMTI2LjQgMTQ2LjkgMTI4LjgiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cGF0aCBkPSJtMTQ4IDEyNi4yIDEuMi0wLjh2MWg0LjR2LTIuOGgtNC4xYy0wLjkgMC0xLjQtMS0xLjQtMi40di0yLjJjMC0xLjUgMC40LTIuNCAxLjQtMi4zaDRjMC45IDAgMS40IDAuOCAxLjQgMi4ydjFsLTEuMyAwLjd2LTEuN2gtNC4xdjIuNGg0YzAuOSAwIDEuNSAwLjcgMS41IDIuMnYyLjljMCAxLjUtMC40IDIuNC0xLjQgMi40aC00LjFjLTEuMSAwLTEuNS0wLjctMS41LTIuNnoiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cGF0aCBkPSJtMTYyLjEgMTE3YzAtMiAwLjUtMyAxLjctM2g0LjJjMS4yIDAgMS42IDEgMS42IDN2Mi4zbC0xLjYgMC40di0zaC00djkuMmg0di0yLjZsMS42IDAuMnYyLjRjMCAyLjItMC40IDIuOS0xLjYgMi45aC00LjFjLTEuMiAwLTEuNy0wLjctMS43LTIuOXYtOC45aC0wLjF6IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBhdGggZD0ibTE3MS42IDExOWMwLTEuNSAwLjQtMi4zIDEuMi0yLjNoNC45YzAuOSAwIDEuNSAwLjggMS41IDIuM3Y3LjRjMCAxLjUtMC40IDIuNC0xLjMgMi40aC00LjljLTAuOCAwLTEuMy0wLjgtMS4zLTIuNGwtMC4xLTcuNHptMS41IDcuNGg0LjZ2LTcuNGgtNC42djcuNHoiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cG9seWdvbiBwb2ludHM9IjE4MC44IDEyOC44IDE4MC44IDExNi43IDE4MiAxMTYuNyAxODUgMTIzLjggMTg3LjggMTE2LjcgMTg5LjEgMTE2LjcgMTg5LjEgMTI4LjggMTg3LjggMTI4LjggMTg3LjggMTIxIDE4NS4yIDEyNy42IDE4NC44IDEyNy42IDE4Mi4xIDEyMC44IDE4Mi4xIDEyOC44IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIxOTAuNiAxMjguOCAxOTAuNiAxMTYuNyAxOTcuMSAxMTYuNyAxOTcuMSAxMTguOSAxOTIuMiAxMTguOSAxOTIuMiAxMjEuOCAxOTQuNyAxMjEuOCAxOTQuNyAxMjQuMSAxOTIuMiAxMjQuMSAxOTIuMiAxMjguOCIgZmlsbD0icmdiKDAsIDE3NCwgMjM5KSIvPgogIDxwYXRoIGQ9Im0xOTcuNyAxMTljMC0xLjUgMC40LTIuNCAxLjMtMi4zaDQuOWMwLjkgMCAxLjUgMC44IDEuNSAyLjN2Ny40YzAgMS41LTAuNCAyLjQtMS4yIDIuNGgtNWMtMSAwLTEuNC0wLjctMS40LTIuNGwtMC4xLTcuNHptMS41IDcuNGg0Ljh2LTcuNGgtNC44djcuNHoiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cGF0aCBkPSJtMjA2LjYgMTI4Ljh2LTEyLjFoNS40YzEuMSAwIDEuNiAwLjggMS42IDIuMnYzLjFjMCAxLjQtMC41IDIuMS0xLjYgMi4xaC0wLjVsMi43IDQuNmgtMS45bC0yLjgtNC42aC0xLjN2NC43aC0xLjZ6bTQuOC02LjhjMC41IDAgMC44LTAuMiAwLjgtMXYtMS4xYzAtMC42LTAuMy0xLTAuOC0xaC0zLjF2My4xaDMuMXoiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cG9seWdvbiBwb2ludHM9IjIxOC41IDExOC45IDIxOC41IDEyOC41IDIxNi45IDEyOC41IDIxNi45IDExOC45IDIxNCAxMTguOSAyMTQgMTE2LjcgMjIxLjYgMTE2LjcgMjIxLjYgMTE4LjkiIGZpbGw9InJnYigwLCAxNzQsIDIzOSkiLz4KICA8cGF0aCBkPSJtMjIyLjIgMTI1YzAuMyAwIDAuOSAwLjQgMC45IDEuNHYyLjFjMCAwLjMtMC42IDIuOC0xLjIgMy41bC0wLjYtMC40YzAuMy0wLjYgMS0yLjYgMS0zLjFsLTAuNy0wLjN2LTEuOGMtMC4xLTEuMSAwLjItMS40IDAuNi0xLjR6IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIyMjcuNCAxMjguOCAyMjcuNCAxMTYuNyAyMjkgMTE2LjcgMjI5IDEyNi40IDIzMy44IDEyNi40IDIzMy44IDEyOC44IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIyMzQuNiAxMjguOCAyMzQuNiAxMTYuNyAyMzYuMiAxMTYuNyAyMzYuMiAxMjYuNCAyNDEgMTI2LjQgMjQxIDEyOC44IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPHBhdGggZD0ibTI0MS41IDExOWMwLTEuNSAwLjMtMi4zIDEuNC0yLjNoMy43YzAuOSAwIDEuMyAwLjggMS4zIDIuM3YxLjhsLTEuMyAwLjR2LTIuM2gtMy42djcuNWgzLjZ2LTIuM2wxLjMgMC40djEuOWMwIDEuNy0wLjQgMi40LTEuMyAyLjRoLTMuN2MtMS4xIDAtMS40LTAuNy0xLjQtMi40di03LjR6IiBmaWxsPSJyZ2IoMCwgMTc0LCAyMzkpIi8+CiAgPGcgZmlsbD0iI2IzYjNiMyI+CiAgICA8cGF0aCBkPSJtOTQuNyAxMzEuOWgxLjVsMy4zIDcuNGgtMS42bC0wLjYtMS42aC0zLjRsLTAuNiAxLjZoLTEuNmwzLTcuNHptMiA0LjQtMS4yLTMuMS0xLjIgMy4xaDIuNHoiLz4KICAgIDxwYXRoIGQ9Im0xMDEuNSAxMzMuM2gxLjN2NmgtMS4zdi02eiIvPgogICAgPHBhdGggZD0ibTEwNS4xIDEzMy4zaDQuNGMwLjggMCAxLjIgMC40IDEuMiAxLjN2MS40YzAgMC44LTAuMyAxLjItMS4yIDEuMmgtMC43bDIuMiAyLjNoLTEuOGwtMS44LTIuM2gtMXYyLjNoLTEuMXYtNi4yaC0wLjJ6bTEuMyAxdjEuN2gyLjVjMC40IDAgMC42IDAgMC42LTAuNHYtMC44YzAtMC40LTAuMi0wLjQtMC42LTAuNGgtMi41di0wLjF6Ii8+CiAgICA8cGF0aCBkPSJtMTE4LjggMTMzLjN2NC42aDMuNXYtMS41bDEuNSAwLjR2MC45YzAgMS4zLTAuMyAxLjYtMS4zIDEuNmgtMy43Yy0xLjEgMC0xLjQtMC4zLTEuNC0xLjZ2LTQuMWMwLTEuMyAwLjMtMS43IDEuNC0xLjdoMy43YzEuMSAwIDEuMyAwLjQgMS4zIDEuN3YwLjhsLTEuNSAwLjN2LTEuMmgtMy41di0wLjJ6Ii8+CiAgICA8cGF0aCBkPSJtMTI3LjQgMTMzLjNoNGMwLjkgMCAxLjIgMC4zIDEuMiAxLjR2My40YzAgMS0wLjMgMS4zLTEuMiAxLjNoLTRjLTAuOSAwLTEuMi0wLjMtMS4yLTEuM3YtMy40YzAtMS4xIDAuMy0xLjQgMS4yLTEuNHptMCA0LjhoMy45di0zLjdoLTMuOXYzLjd6Ii8+CiAgICA8cGF0aCBkPSJtMTM0LjUgMTMzLjNoMC45bDMuOSAzLjh2LTMuOGgxLjJ2NmgtMC45bC0zLjktMy45djMuOWgtMS4ydi02eiIvPgogICAgPHBhdGggZD0ibTE0Mi43IDEzMy4zaDMuMmMyIDAgMyAxLjEgMyAzcy0xIDMuMS0zLjEgMy4xaC0zdi02LjFoLTAuMXptMi41IDQuOGMxLjUgMCAyLjItMC40IDIuMi0ycy0wLjYtMS44LTIuMi0xLjhoLTEuM3YzLjhoMS4zeiIvPgogICAgPHBhdGggZD0ibTE1MC42IDEzMy4zaDEuM3Y2LjFoLTEuM3YtNi4xeiIvPgogICAgPHBhdGggZD0ibTE1NyAxMzkuNGgtMS4zdi00LjloLTIuM3YtMS4yaDUuOXYxLjFoLTIuM3Y1eiIvPgogICAgPHBhdGggZD0ibTE2MC43IDEzMy4zaDEuM3Y2LjFoLTEuM3YtNi4xeiIvPgogICAgPHBhdGggZD0ibTE2NS40IDEzMy4zaDMuOWMxIDAgMS4yIDAuMyAxLjIgMS40djMuNGMwIDEtMC4zIDEuMy0xLjIgMS4zaC0zLjljLTAuOSAwLTEuMi0wLjMtMS4yLTEuM3YtMy40YzAtMS4xIDAuMy0xLjQgMS4yLTEuNHptMC4xIDQuOGgzLjh2LTMuN2gtMy44djMuN3oiLz4KICAgIDxwYXRoIGQ9Im0xNzIuNiAxMzMuM2gwLjlsMy45IDMuOHYtMy44aDEuMnY2aC0wLjlsLTMuOS0zLjl2My45aC0xLjJ2LTZ6Ii8+CiAgICA8cGF0aCBkPSJtMTgwLjkgMTMzLjNoMS4zdjYuMWgtMS4zdi02LjF6Ii8+CiAgICA8cGF0aCBkPSJtMTg0LjMgMTMzLjNoMC45bDMuOSAzLjh2LTMuOGgxLjJ2NmgtMC45bC0zLjktMy45djMuOWgtMS4ydi02eiIvPgogICAgPHBhdGggZD0ibTE5My45IDEzNC40djMuN2gzLjV2LTEuMmgtMS43di0xLjFoMi45djIuM2MwIDEtMC4zIDEuMy0xLjIgMS4zaC0zLjVjLTAuOSAwLTEuMy0wLjMtMS4zLTEuM3YtMy40YzAtMS4xIDAuMy0xLjQgMS4zLTEuNGgzLjRjMC45IDAgMS4zIDAuMyAxLjMgMS4zdjAuMmwtMS4yIDAuMnYtMC42aC0zLjV6Ii8+CiAgPC9nPgogIDxwYXRoIGQ9Im05Mi4xIDE0Mi4zaDEuMnYyLjJoMy42di0yLjJoMS4ydjUuOGgtMS4ydi0yLjVoLTMuNnYyLjVoLTEuMnYtNS44eiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTEwMC4yIDE0My41aDQuMnYwLjloLTMuMnYxaDEuOHYwLjloLTEuOHYxLjJoMy4zdjAuOWgtNC4ydi00LjloLTAuMXoiIGZpbGw9InJnYigxNzksIDE3OSwgMTc5KSIvPgogIDxwYXRoIGQ9Im0xMDcuNSAxNDMuNWgxbDIuMyA0LjZoLTEuMWwtMC40LTFoLTIuNGwtMC40IDFoLTFsMi00LjZ6bTEuMyAyLjgtMC45LTEuOC0wLjcgMS44aDEuNnoiIGZpbGw9InJnYigxNzksIDE3OSwgMTc5KSIvPgogIDxwYXRoIGQ9Im0xMTMuNyAxNDguMWgtMXYtMy43aC0xLjh2LTAuOWg0LjZ2MC45aC0xLjh2My43eiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTExNi44IDE0My41aDF2NC42aC0xdi00LjZ6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTE5LjUgMTQzLjVoMC43bDMuMSAzdi0zaDAuOXY0LjZoLTAuN2wtMy4xLTN2M2gtMC45di00LjZ6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTI2LjcgMTQ0LjR2Mi44aDIuOXYtMC45aC0xLjV2LTAuOWgyLjV2MS44YzAgMC45LTAuMiAxLjEtMC45IDEuMWgtM2MtMC42IDAtMC45LTAuMi0wLjktMS4xdi0yLjdjMC0wLjggMC4zLTEgMC45LTFoM2MwLjYgMCAwLjkgMC4yIDAuOSAxdjAuMWwtMC45IDAuMnYtMC40aC0zeiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTEzNy41IDE0My41aDFsMi4zIDQuNmgtMWwtMC41LTFoLTIuNWwtMC40IDFoLTAuOWwyLTQuNnptMS40IDIuOC0wLjktMS44LTAuOCAxLjhoMS43eiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTE0MS44IDE0My41aDAuN2wzLjEgM3YtM2gwLjh2NC42aC0wLjZsLTMuMS0zdjNoLTAuOXYtNC42eiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTE0OC4yIDE0My41aDIuNWMxLjYgMCAyLjQgMC45IDIuNCAyLjMgMCAxLjYtMC45IDIuNC0yLjYgMi40aC0yLjN2LTQuN3ptMiAzLjdjMS4yIDAgMS43LTAuNCAxLjctMS41cy0wLjQtMS40LTEuNC0xLjRoLTEuNXYyLjloMS4yeiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTE1OS4zIDE0My4zdjMuOGgzdi0xLjNsMS4xIDAuM3YwLjdjMCAxLjEtMC4zIDEuMy0xLjIgMS4zaC0zYy0wLjkgMC0xLjEtMC4zLTEuMS0xLjN2LTMuNGMwLTEgMC4yLTEuMyAxLjEtMS4zaDNjMC45IDAgMS4yIDAuMyAxLjIgMS4zdjAuNmwtMS4xIDAuMnYtMC45aC0zeiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTE2Ni40IDE0My41aDNjMC42IDAgMC45IDAuMiAwLjkgMXYyLjdjMCAwLjgtMC4yIDEtMC45IDFoLTNjLTAuNiAwLTAuOS0wLjItMC45LTF2LTIuN2MwLTAuOCAwLjItMSAwLjktMXptMyAzLjd2LTIuOGgtMi45djIuOGgyLjl6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTczLjEgMTQzLjVoM2MwLjcgMCAxIDAuMiAxIDF2Mi43YzAgMC44LTAuMyAxLTEgMWgtM2MtMC42IDAtMC45LTAuMi0wLjktMXYtMi43YzAuMS0wLjggMC4zLTEgMC45LTF6bTMgMy43di0yLjhoLTIuOHYyLjhoMi44eiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTE3OC44IDE0My41aDF2My43aDN2MC45aC00di00LjZ6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTgzLjkgMTQzLjVoMS4xdjQuN2gtMS4xdi00Ljd6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTg2LjcgMTQzLjVoMC43bDMuMSAzdi0zaDAuOXY0LjZoLTAuN2wtMy4xLTN2M2gtMC45di00LjZ6IiBmaWxsPSJyZ2IoMTc5LCAxNzksIDE3OSkiLz4KICA8cGF0aCBkPSJtMTkzLjkgMTQ0LjR2Mi44aDIuOXYtMC45aC0xLjR2LTAuOWgyLjR2MS44YzAgMC45LTAuMiAxLjEtMC45IDEuMWgtM2MtMC41IDAtMC44LTAuMi0wLjgtMS4xdi0yLjdjMC0wLjggMC4yLTEgMC44LTFoM2MwLjcgMCAwLjkgMC4yIDAuOSAxdjAuMWwtMC45IDAuMnYtMC40aC0zeiIgZmlsbD0icmdiKDE3OSwgMTc5LCAxNzkpIi8+CiAgPHBhdGggZD0ibTc4IDExMC45czEuNiA2LjgtMyAxMC44Yy0yLjcgMi4zLTUuNiAyLjktOC44IDMuM2wwLjItMS41YzIuOC0wLjggMTEtMSA5LjQtMTMuMS0wLjUgNS43LTIgOS40LTguOSA5LjQtMC4zLTEwLjEtMy41LTE5LjYtMTAuNC0yMC41LTYuMS0wLjgtMTIuNiA1LjMtMTYuMyAxMC43bDEgMC40YzcuOS04LjYgMTIuMi03LjMgMTQuOS0zLjIgMi42IDMuOSAzIDguNiAyLjkgMTIuN2w2LjIgMTQuNmM1LjYgMC40IDExLjQtMC43IDE0LjctNC43IDMuNi00LjIgNS0xMy41LTEuOS0xOC45eiIgZmlsbD0iIzAwQUVFRiIvPgogIDxwYXRoIGQ9Im02MS40IDEzOS4yLTEuMyAyLjYtMC4xIDAuMWM5LjEtMC44IDE5LjgtMC4yIDI1LTEwLjcgMS4xLTIuMyAwLjctMTEgMC40LTgtMC42IDcuMi04LjMgMTMuOC0xNy43IDEyLjhoLTIuNmwtMy43IDMuMnoiIGZpbGw9IiMwMEFFRUYiLz4KICA8cGF0aCBkPSJtNjEuMiAxNDEuN2MtMy41IDAuMi00LjktMC4zLTYuMi0wLjUtNC4yIDcuNC05LjkgMTMuOC0xNS41IDEyLjgtMy4zLTAuNy02LjQtNS44LTYuOC0xMC42bC0xLjIgMC4zYzAgNi41IDIuNCAxNiA4LjcgMTYuNSA3LjcgMS4yIDEzLjYtNC45IDE4LjMtMTIuOCA5LjIgMS45IDI1LjggMi42IDI2LjUtMTUuOS00IDcuMi0xMC44IDExLjUtMjMuOCAxMC4yeiIgZmlsbD0iIzAwQUVFRiIvPgogIDxwYXRoIGQ9Im01NS45IDEyMC44LTAuMi0yLjhjMC41LTUtMS45LTEzLjktOC40LTEwLjYtMS41IDAuOC0yLjggMS45LTQgMy43bDMgMWMyLjUtMi40IDcuNi00LjUgOC4yIDQuNS0yLjMtMC43LTEyLjItNS4xLTIxLjktNC4xLTEwLjEgMS41LTE0LjYgOC0xNC45IDE2LjYgNi41LTguOSAxNS0xMS43IDI5LjItOC45bDYuMiAzIDIuOC0yLjR6IiBmaWxsPSIjRjcyRDM2Ii8+CiAgPHBhdGggZD0ibTQ5LjkgMTQzLjQgMS40LTEuMS03LjMtNC42Yy0xMi0yLjUtMjEgMS45LTE5LjkgMTItMTEuOC0xMi4xLTIuMy0yNi42IDE3LjktMjMuMWw0LjIgMi40LTEuNSAwLjdjLTguNS0zLTI0LjctMi42LTI3LjEgMTEtMS43LTEzLjMgOS4zLTIzLjcgMjkuMS0xOS4xbDYuMyAyLjVjMi4xIDYuNS0yLjUgMTcuNi0zLjEgMTkuM3oiIGZpbGw9IiNGNzJEMzYiLz4KICA8cGF0aCBkPSJtMzQuMyAxNDMuMSAyLjkgMC4xYzAgMy44IDIuOSA3LjkgNi40IDQuNyAxLjUtMSA0LjQtNC4yIDMuOS00LjQtMTMuMS0zLjktMjEuOS0zLjYtMjEuMSA3LTIuMy03LjkgMy0xMi44IDE3LjQtMTIuOGw0LjQgMi43IDMuMSAyYy0yLjkgNC45LTYuMiA5LjMtMTAuOSA5LjMtMy4xIDAtNi4xLTQuNS02LjEtOC42eiIgZmlsbD0iI0Y3MkQzNiIvPgogIDxwYXRoIGQ9Im02NiAxMzEuMWMwIDYtNSAxMS41LTExLjUgMTEuNS02LjUgMC4xLTEyLjEtNC45LTEyLjUtMTAuOS0wLjQtNi4zIDUuMS0xMS45IDExLjEtMTIgNi4zLTAuMSAxMi41IDQuMiAxMi45IDExLjR6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNiZjJlM2QiIHN0cm9rZS13aWR0aD0iLjUyNyIvPgogIDxwYXRoIGQ9Im00NC4yIDEzNS45IDIuNS05LjdoMS4xbDIuNSA5LjZoLTAuOWwtMC43LTItMi45LTAuMS0wLjYgMi4zLTEtMC4xem0yLjEtMy43aDIuMmwtMS4xLTQuNC0xLjEgNC40eiIgZmlsbD0icmdiKDExLCAxODcsIDIzOSkiLz4KICA8cGF0aCBkPSJtNTEuNiAxMzUuOS0xLjctOS43aDEuMWwxIDYuMiAxLjEtNi4yaDAuOGwxLjIgNi4yIDEuMi02LjJoMWwtMS43IDkuN2gtMC42bC0xLjQtNi43LTEuMyA2LjdoLTAuN3oiIGZpbGw9InJnYigxMSwgMTg3LCAyMzkpIi8+CiAgPHBhdGggZD0ibTU4LjcgMTI4LjV2NS45aDMuM3YtMS45bDEuMSAwLjR2MS40YzAgMS4zLTAuMyAxLjctMS4yIDEuNmgtMi43Yy0wLjkgMC0xLjEtMC40LTEuMS0xLjd2LTUuN2MwLTEuNCAwLjMtMS45IDEuMS0xLjloMi43YzAuOSAwIDEuMiAwLjUgMS4yIDEuOXYxLjNsLTEuMSAwLjN2LTEuNmgtMy4zeiIgZmlsbD0icmdiKDExLCAxODcsIDIzOSkiLz4KICA8cGF0aCBkPSJtNTMuNyAxMTkuNyIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIi8+Cjwvc3ZnPg==";

const LOGO_IMG = `<img src="data:image/svg+xml;base64,${LOGO_B64}" alt="Air Waves Comfort" width="220" height="59" style="display:block;margin:0 auto 12px auto;max-width:220px;" />`;

export interface QuoteEmailData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  lang: "en" | "es";
}

/** Send a request through the Resend connector and throw if it fails. */
async function resendSend(payload: object): Promise<void> {
  // proxy() returns a web Response object
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      `Resend API error ${response.status}: ${JSON.stringify(errorBody)}`
    );
  }
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<void> {
  const subject = `New Quote Request — ${data.name} (${data.serviceType})`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f7fb;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0A2A6E;padding:28px 40px;text-align:center;">
            ${LOGO_IMG}
            <h1 style="color:#ffffff;font-size:20px;margin:4px 0 0 0;font-weight:600;letter-spacing:0.3px;">New Quote Request</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="color:#6B7280;margin:0 0 24px 0;font-size:14px;">A customer just submitted a quote request from your website. Details below:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                  <span style="color:#0A2A6E;font-size:16px;font-weight:600;">${data.name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                  <a href="mailto:${data.email}" style="color:#00AEEF;font-size:16px;font-weight:600;text-decoration:none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Phone</span><br/>
                  <a href="tel:${data.phone.replace(/\D/g, "")}" style="color:#00AEEF;font-size:16px;font-weight:600;text-decoration:none;">${data.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Service Requested</span><br/>
                  <span style="color:#0A2A6E;font-size:16px;font-weight:600;">${data.serviceType}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <span style="color:#9CA3AF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</span><br/>
                  <p style="color:#374151;font-size:15px;line-height:1.6;margin:6px 0 0 0;">${data.message || "<em style='color:#9CA3AF'>No message provided</em>"}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:28px;text-align:center;">
              <a href="mailto:${data.email}" style="display:inline-block;background:#00AEEF;color:#ffffff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;">Reply to ${data.name}</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F4F7FB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="color:#9CA3AF;font-size:12px;margin:0;">Air Waves Comfort, LLC &bull; 9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016 &bull; License #CAC1820880</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resendSend({
    from: "Air Waves Comfort <quotes@airwavesc.com>",
    to: ["airwavescomfort33@gmail.com"],
    subject,
    html,
    reply_to: data.email,
  });
}

export async function sendQuoteConfirmation(data: QuoteEmailData): Promise<void> {
  const isEs = data.lang === "es";

  const subject = isEs
    ? "Recibimos su solicitud — Air Waves Comfort"
    : "We received your quote request — Air Waves Comfort";

  const greeting = isEs ? `Hola ${data.name},` : `Hi ${data.name},`;
  const intro = isEs
    ? "Gracias por contactar a Air Waves Comfort. Hemos recibido su solicitud de presupuesto y nos pondremos en contacto con usted muy pronto."
    : "Thank you for contacting Air Waves Comfort. We've received your quote request and will be in touch shortly.";
  const summaryTitle = isEs ? "Su solicitud:" : "Your request:";
  const serviceLabel = isEs ? "Servicio:" : "Service:";
  const msgLabel = isEs ? "Mensaje:" : "Message:";
  const urgentText = isEs
    ? "¿Necesita ayuda urgente? Llámenos ahora:"
    : "Need urgent help? Call us now:";
  const closing = isEs
    ? "El equipo de Air Waves Comfort"
    : "The Air Waves Comfort Team";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f7fb;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0A2A6E;padding:28px 40px;text-align:center;">
            ${LOGO_IMG}
            <h1 style="color:#ffffff;font-size:20px;margin:4px 0 0 0;font-weight:600;letter-spacing:0.3px;">${isEs ? "¡Solicitud Recibida!" : "Request Received!"}</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="color:#0A2A6E;font-size:18px;font-weight:600;margin:0 0 12px 0;">${greeting}</p>
            <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px 0;">${intro}</p>
            <div style="background:#F4F7FB;border-left:4px solid #00AEEF;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:24px;">
              <p style="color:#9CA3AF;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 10px 0;">${summaryTitle}</p>
              <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>${serviceLabel}</strong> ${data.serviceType}</p>
              ${data.message ? `<p style="margin:4px 0;color:#374151;font-size:14px;"><strong>${msgLabel}</strong> ${data.message}</p>` : ""}
            </div>
            <p style="color:#6B7280;font-size:14px;line-height:1.6;">${urgentText}</p>
            <p style="text-align:center;margin:16px 0 24px 0;">
              <a href="tel:7863623648" style="display:inline-block;background:#F72D36;color:#ffffff;font-weight:700;font-size:17px;padding:14px 32px;border-radius:50px;text-decoration:none;">📞 (786) 362-3648</a>
            </p>
            <p style="color:#9CA3AF;font-size:13px;">${closing}</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F4F7FB;padding:20px 40px;text-align:center;border-top:1px solid #E5E7EB;">
            <p style="color:#9CA3AF;font-size:12px;margin:0;">Air Waves Comfort, LLC &bull; 9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016 &bull; License #CAC1820880</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resendSend({
    from: "Air Waves Comfort <quotes@airwavesc.com>",
    to: [data.email],
    subject,
    html,
  });
}
