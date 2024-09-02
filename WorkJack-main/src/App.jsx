import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dialog from './components/Dialog'
import { getProductListByPos } from '../src/components/function/auth'
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleOpenDialog = () => setIsDialogOpen(true)
  const handleCloseDialog = () => setIsDialogOpen(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' })

  const openDialog = async (pos, title) => {
    try {
      const productData = await getProductListByPos(pos)

      console.log('Data received from API:', productData)

      const contentItems = [
        { label: 'รหัสสินค้า', value: productData.code },
        { label: 'ชื่อสินค้า', value: productData.product_list },
        { label: 'จำนวน', value: productData.quantity },
        { label: 'ตำแหน่ง', value: productData.pos },
      ]

      const content = (
        <ul>
          {contentItems.map((item, index) => (
            <li key={index}>
              {item.label}: {item.value || 'ไม่ระบุ'}
            </li>
          ))}
        </ul>
      )

      setDialogContent({ title, content })
      setDialogOpen(true)
    } catch (error) {
      console.error('Error fetching product data:', error)
      setDialogContent({
        title: 'เกิดข้อผิดพลาด',
        content: `ไม่สามารถดึงข้อมูลสินค้าได้: ${error.message}`,
      })
      setDialogOpen(true)
    }
  }
  return (
    <>
      {!isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 p-4">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out">
          <div className="w-64 h-screen bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">เมนู</h2>
                <button
                  onClick={toggleMenu}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <ul>
                <li className="mb-2">
                  <a
                    href="#pharmacy"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ร้านขายยา
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#storage"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ห้องเก็บของ
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#cashier"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    แคชเชียร์
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#beds" className="text-blue-600 hover:text-blue-800">
                    เตียงผู้ป่วย
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className=" overflow-auto px-[10rem]">
        <div className="flex items-start space-x-8 min-w-[1200px] justify-between pt-[5rem]">
          <div className="flex-shrink-0  flex-row flex space-x-8">
            <div className="border-4 border-yellow-400 rounded-lg p-4 bg-yellow-100">
              <span className="text-[7rem]  font-bold text-yellow-700">
                ร้านขายยา
              </span>
            </div>
          </div>

          <div className="flex-row flex space-x-8 flex-shrink-0">
            <div className="w-1/2 pt-[15rem] pl-[3rem] w-[320px]">
              <div className="grid grid-cols-10 text-sm">
                <div className="col-span-9 grid grid-cols-2">
                  <div className="py-1 px-2 text-center"></div>
                  <div className="py-1 px-2 text-center bg-black text-white">
                    A02
                  </div>
                </div>
                <div className="py-1 px-1 text-center bg-black text-white">
                  ชั้น
                </div>
              </div>
              <div className="border-2 border-yellow-400 bg-yellow-100">
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                    <div className="py-1 px-2 text-center border-r border-yellow-300">
                      <button
                        onClick={() =>
                          openDialog('A02-D01', 'รายละเอียดของ A02-D01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-D01
                      </button>
                    </div>
                    <div className="py-1 px-2 text-center">
                      <button
                        onClick={() =>
                          openDialog('A02-D02', 'รายละเอียดของ A02-D02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-D02
                      </button>
                    </div>
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-1 text-center">
                    4
                  </div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                    <div className="py-1 px-2 text-center border-r border-yellow-300">
                      <button
                        onClick={() =>
                          openDialog('A02-D01', 'รายละเอียดของ A02-C01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-C01
                      </button>
                    </div>
                    <div className="py-1 px-2 text-center">
                      <button
                        onClick={() =>
                          openDialog('A02-C02', 'รายละเอียดของ A02-C02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-C02
                      </button>
                    </div>
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-2 text-center">
                    3
                  </div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                    <div className="py-1 px-2 text-center border-r border-yellow-300">
                      <button
                        onClick={() =>
                          openDialog('A02-B01', 'รายละเอียดของ A02-B01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-B01
                      </button>
                    </div>
                    <div className="py-1 px-2 text-center">
                      <button
                        onClick={() =>
                          openDialog('A02-B02', 'รายละเอียดของ A02-B02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-B02
                      </button>
                    </div>
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-2 text-center">
                    2
                  </div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 grid grid-cols-2 border-r border-yellow-300">
                    <div className="py-1 px-2 text-center border-r border-yellow-300">
                      <button
                        onClick={() =>
                          openDialog('A02-A01', 'รายละเอียดของ A02-A01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-A01
                      </button>
                    </div>
                    <div className="py-1 px-2 text-center">
                      <button
                        onClick={() =>
                          openDialog('A02-A02', 'รายละเอียดของ A02-A02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        A02-A02
                      </button>
                    </div>
                  </div>
                  <div className="py-1 px-2 text-center">1</div>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="grid grid-cols-10 text-xs">
                <div className="col-span-8 py-1 px-2 bg-white"></div>
                <div className="py-1 px-2 text-center bg-black text-white">
                  A01
                </div>
                <div className="py-1 px-2 text-center bg-black text-white">
                  ชั้น
                </div>
              </div>
              <div className="border-2 border-yellow-300 bg-yellow-100 text-center">
                <div className="grid grid-cols-10 text-xs">
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D01
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D02
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D03
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D05
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D05
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D06
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D07
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D08
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-D09
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-2">4</div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C01
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C02
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C03
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C04
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C05
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C06
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C07
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C08
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-C09
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-2">3</div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B01
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B02
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B03
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B04
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B05
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B06
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B07
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B08
                  </div>
                  <div className="border-r border-b border-yellow-300 py-1 px-2">
                    A01-B09
                  </div>
                  <div className="border-b border-yellow-300 py-1 px-2">2</div>
                </div>
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 border-r border-yellow-300 py-1 px-2">
                    <button
                      onClick={() =>
                        openDialog('A01-A01', 'รายละเอียดของ A01-A01')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      A01-A01
                    </button>
                  </div>
                  <div className="py-1 px-2 text-center">1</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="bg-black text-white py-2 px-4 rounded">
                  โทรทัศน์
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-8 justify-between">
          <div className="flex-shrink-0 flex">
            <div className="border-4 border-yellow-400 rounded-lg p-4 bg-yellow-100 w-[400px]">
              <span className="text-[6rem] font-bold text-yellow-700">
                ห้องเก็บของ
              </span>
            </div>
            <div className=" pt-[12rem] ">
              <div className="w-1/2 w-[320px] pl-[6rem]">
                <div className="grid grid-cols-10 text-xs">
                  <div className="col-span-9 grid grid-cols-2">
                    <div className="py-1 px-2 text-center"></div>
                    <div className="py-1 px-2 text-center bg-black text-white">
                      D01
                    </div>
                  </div>
                  <div className="py-1 px-2 text-center bg-black text-white">
                    ชั้น
                  </div>
                </div>
                <div className="border-2 border-yellow-400 bg-yellow-100 text-sm">
                  <div className="grid grid-cols-10">
                    <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                      <div className="py-1 px-2 text-center border-r border-yellow-300">
                        <button
                          onClick={() =>
                            openDialog('D01-D01', 'รายละเอียดของ D01-D01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-D01
                        </button>
                      </div>
                      <div className="py-1 px-2 text-center">
                        <button
                          onClick={() =>
                            openDialog('A02-D02', 'รายละเอียดของ A02-D02')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-D02
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-yellow-300 py-1 px-2 text-center">
                      4
                    </div>
                  </div>
                  <div className="grid grid-cols-10">
                    <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                      <div className="py-1 px-2 text-center border-r border-yellow-300">
                        <button
                          onClick={() =>
                            openDialog('A02-D02', 'รายละเอียดของ A02-D02')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-B01
                        </button>
                      </div>
                      <div className="py-1 px-2 text-center">
                        <button
                          onClick={() =>
                            openDialog('D01-B01', 'รายละเอียดของ D01-B01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-C02
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-yellow-300 py-1 px-2 text-center">
                      3
                    </div>
                  </div>
                  <div className="grid grid-cols-10">
                    <div className="col-span-9 grid grid-cols-2 border-r border-b border-yellow-300">
                      <div className="py-1 px-2 text-center border-r border-yellow-300">
                        <button
                          onClick={() =>
                            openDialog('D01-B01', 'รายละเอียดของ D01-B01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-B01
                        </button>
                      </div>
                      <div className="py-1 px-2 text-center">
                        <button
                          onClick={() =>
                            openDialog('D01-B01', 'รายละเอียดของ D01-B01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-B02
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-yellow-300 py-1 px-2 text-center">
                      2
                    </div>
                  </div>
                  <div className="grid grid-cols-10 text-xs">
                    <div className="col-span-9 grid grid-cols-2 border-r border-yellow-300">
                      <div className="py-1 px-2 text-center border-r border-yellow-300">
                        <button
                          onClick={() =>
                            openDialog('D01-B01', 'รายละเอียดของ D01-B01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-A01
                        </button>
                      </div>
                      <div className="py-1 px-2 text-center">
                        <button
                          onClick={() =>
                            openDialog('D01-B01', 'รายละเอียดของ D01-B01')
                          }
                          className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                        >
                          D01-A02
                        </button>
                      </div>
                    </div>
                    <div className="py-1 px-2 text-center">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[5rem] ml-[130rem] origin-top-left translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
          <div className="h-[35px]">
            <div className="flex-[0.06] text-xs">
              <div className="">โทรทัศน์</div>
            </div>
          </div>
        </div>

        <div className="mt-[5rem] ml-[130rem] origin-top-left translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
          <div className="h-[35px]">
            <div className="flex-[0.06] text-xs">
              <div className="">โทรทัศน์</div>
            </div>
          </div>
        </div>

        <div className="mt-[5rem] ml-[131.7rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
          <div className="h-[35px] text-xs">
            <div className="">เตียงผู้ป่วย</div>
          </div>
        </div>

        <div className="mt-[-22rem] ml-[65rem]">
          <div className="bg-gray-300 w-[750px] h-[130px] rounded-3xl my-10 mt-[21rem]"></div>
        </div>

        <div className="mt-[-18rem] ml-[110rem] ">
          <div className="bg-gray-300 w-[200px] h-[200px] rounded-3xl my-10 mt-[21rem]"></div>
        </div>

        <div className="mt-[-18rem] ml-[95rem]">
          <div className="bg-gray-300 w-[200px] h-[80px] rounded-3xl my-10 mt-[21rem] text-center">
            แคชเชียร์
          </div>
        </div>

        <div className="mt-[-18rem] ml-[95rem]">
          <div className="bg-gray-300 w-[200px] h-[80px] rounded-3xl my-10 mt-[21rem] text-center">
            แคชเชียร์
          </div>
        </div>

        <div className="mt-[-20rem]">
          <div className="pl-[-10rem] pt-[-100rem]">
            <div className="origin-top-left rotate-90 translate-y-[-100%] w-[calc(100vh-2rem)] flex flex-col">
              <div className="pl-[5rem] pt-[5rem]">
                <div className="origin-top-left translate-y-[-100%] w-[calc(100vh-2rem)] flex flex-col">
                  <div className="flex">
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 p-1 text-xs"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200 text-center">
                      D05
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-F08', 'รายละเอียดของ D05-F08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-F08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-F16', 'รายละเอียดของ D05-F16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-F16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-E08', 'รายละเอียดของ D05-E08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-E08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-E16', 'รายละเอียดของ D05-E16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-E16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D01', 'รายละเอียดของ D05-D01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D01
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D01', 'รายละเอียดของ D05-D01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D01
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D03', 'รายละเอียดของ D05-D03')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D03
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D05', 'รายละเอียดของ D05-D05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D05
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D05', 'รายละเอียดของ D05-D05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D05
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D06', 'รายละเอียดของ D05-D06')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D06
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D07', 'รายละเอียดของ D05-D07')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D07
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D08', 'รายละเอียดของ D05-D08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D10', 'รายละเอียดของ D05-D10')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D10
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D10', 'รายละเอียดของ D05-D10')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D11
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D12', 'รายละเอียดของ D05-D12')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D12
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D13', 'รายละเอียดของ D05-D13')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D13
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D14', 'รายละเอียดของ D05-D14')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D14
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200"></div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-D16', 'รายละเอียดของ D05-D16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-D16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C01', 'รายละเอียดของ D05-C01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C01
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C02', 'รายละเอียดของ D05-C02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C02
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C03', 'รายละเอียดของ D05-C03')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C03
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C04', 'รายละเอียดของ D05-C04')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C04
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C05', 'รายละเอียดของ D05-C05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C05
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C06', 'รายละเอียดของ D05-C06')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C06
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C07', 'รายละเอียดของ D05-C07')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C07
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C08', 'รายละเอียดของ D05-C08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C09', 'รายละเอียดของ D05-C09')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C09
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C10', 'รายละเอียดของ D05-C10')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C10
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C11', 'รายละเอียดของ D05-C11')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C11
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C12', 'รายละเอียดของ D05-C12')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C12
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C13', 'รายละเอียดของ D05-C13')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C13
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C14', 'รายละเอียดของ D05-C14')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C14
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C15', 'รายละเอียดของ D05-C15')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C15
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-C16', 'รายละเอียดของ D05-C16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-C16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B01', 'รายละเอียดของ D05-B01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B01
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B02', 'รายละเอียดของ D05-B02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B02
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B03', 'รายละเอียดของ D05-B03')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B03
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B04', 'รายละเอียดของ D05-B04')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B04
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B05', 'รายละเอียดของ D05-B05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B05
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B05', 'รายละเอียดของ D05-B05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B06
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B07', 'รายละเอียดของ D05-B07')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B07
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B08', 'รายละเอียดของ D05-B08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B09', 'รายละเอียดของ D05-B09')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B09
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B10', 'รายละเอียดของ D05-B10')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B10
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B11', 'รายละเอียดของ D05-B11')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B11
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B12', 'รายละเอียดของ D05-B12')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B12
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B13', 'รายละเอียดของ D05-B13')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B13
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B14', 'รายละเอียดของ D05-B14')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B14
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B15', 'รายละเอียดของ D05-B15')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B15
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-B16', 'รายละเอียดของ D05-B16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-B16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A01', 'รายละเอียดของ D05-A01')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A01
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A02', 'รายละเอียดของ D05-A02')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A02
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A03', 'รายละเอียดของ D05-A03')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A03
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A04', 'รายละเอียดของ D05-A04')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A04
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A05', 'รายละเอียดของ D05-A05')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A05
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A06', 'รายละเอียดของ D05-A06')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A06
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A07', 'รายละเอียดของ D05-A07')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A07
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A08', 'รายละเอียดของ D05-A08')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A08
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A09', 'รายละเอียดของ D05-A09')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A09
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A10', 'รายละเอียดของ D05-A10')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A10
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A11', 'รายละเอียดของ D05-A11')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A11
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A12', 'รายละเอียดของ D05-A12')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A12
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog(' D05-A13', 'รายละเอียดของ  D05-A13')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A13
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog(' D05-A14', 'รายละเอียดของ  D05-A14')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A14
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A15', 'รายละเอียดของ  D05-A15')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A15
                      </button>
                    </div>
                    <div className="flex-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 p-1 text-xs bg-blue-200">
                      <button
                        onClick={() =>
                          openDialog('D05-A16', 'รายละเอียดของ  D05-A16')
                        }
                        className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                      >
                        D05-A16
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วน 2 */}
          <div className="flex mt-[-13rem]">
            <div className="pl-[15rem] text-center">
              <div className="origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 border-t-gray-500">
                    D03
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    <button
                      onClick={() =>
                        openDialog('D03-A01', 'รายละเอียดของ  D03-A01')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      D03-A01
                    </button>
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    <button
                      onClick={() =>
                        openDialog('D03-A02', 'รายละเอียดของ  D03-A02')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      D03-A02
                    </button>
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    <button
                      onClick={() =>
                        openDialog('D03-A03', 'รายละเอียดของ  D03-A03')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      D03-A03
                    </button>
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                    <button
                      onClick={() =>
                        openDialog('D03-A04', 'รายละเอียดของ  D03-A04')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      D03-A04
                    </button>
                  </div>
                </div>
              </div>
              <div className=" pl-[20rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-white"></div>
                  <div className="flex-[0.1] text-xs border border-white"></div>
                  <div className="flex-[0.1] text-xs border border-white"></div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    D04
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                  <button
                      onClick={() =>
                        openDialog('D03-A01', 'รายละเอียดของ  D03-A01')
                      }
                      className="w-full h-full text-center bg-transparent text-black font-semibold focus:outline-none hover:underline cursor-pointer border-[0px] border-yellow-300"
                    >
                      D03-A01
                    </button>
                    
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    D03-A02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    D03-A03
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    D03-A04
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วน 3 */}
          <div className="flex mt-[-8rem] flex-shrink-0">
            <div className="pl-[35rem] text-center">
              {/*ส่วนที่ 4*/}
              <div className="origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white"></div>
                  <div className="flex-[0.06] text-xs border border-white border-t-gray-500 border-l-gray-500 border-b-gray-500">
                    C01
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 border-t-gray-500">
                    ชั้น
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-D09
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-D08
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-D07
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-D06
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500"></div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-D05
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-D03
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-D02
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-D01
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                    4
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-C09
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-C08
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-C07
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-C06
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500"></div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-C04
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-C03
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-C02
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-C01
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                    3
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-B09
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-B08
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-B07
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B06
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B05
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B04
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B03
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B02
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-B01
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                    2
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-A09
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-A08
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C01-A07
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A06
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A05
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A04
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A03
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A02
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C01-A01
                  </div>
                  <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                    1
                  </div>
                </div>
              </div>
              {/*ส่วนที่ 5*/}
              <div className=" pl-[16rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col mt-[15rem]">
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-white"></div>
                  <div className="flex-[0.1] text-xs border border-white"></div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                    C02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                    ชั้น
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-D03
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-D02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C02-D01
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    4
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-C03
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-C02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C02-C01
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    3
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-B03
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-B02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C02-B01
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    2
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-A03
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500">
                    C02-A02
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    C02-A01
                  </div>
                  <div className="flex-[0.1] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[-22rem] pl-[55rem]">
            <div className="bg-red-700 text-white text-center w-[250px] h-[400px] flex flex-col justify-center mx-[-4rem]">
              <p className="text-base font-bold">เตียง</p>
              <p className="text-xs">ผู้ป่วย</p>
            </div>
            {/* ส่วนที่ปรับขนาด */}
          </div>

          {/* แสดง1 */}
          <div className="flex pl-[59rem]">
            <div className="mt-20 w-[250px] flex flex-col">
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  C02
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  ชั้น
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  B06-C01
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  B06-C02
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  B06-B01
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  B06-B02
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red] text-end">
                  บนโต๊ะ
                </div>
                <div className="flex-1 text-[10px] p-1 bg-[red] text-start">
                  B01-A06
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red] h-10"></div>
              </div>
            </div>
            {/* แสดง1 */}
            <div className="mt-20 w-[250px] flex flex-col pl-[8rem]">
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  C02
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  ชั้น
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  B06-C01
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  B06-C02
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-t-gray-500 border-l-gray-500">
                  B06-B01
                </div>
                <div className="flex-1 text-[10px] p-1 border border-gray-300 border-b-gray-500 border-l-gray-500 border-t-gray-500 border-r-gray-500">
                  B06-B02
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red] text-end">
                  บนโต๊ะ
                </div>
                <div className="flex-1 text-[10px] p-1 bg-[red] text-start">
                  B01-A06
                </div>
              </div>
              <div className="flex w-[200px]">
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red]"></div>
                <div className="flex-1 text-[10px] p-1 bg-[red] h-10"></div>
              </div>
            </div>

            <div className="flex mt-[-10rem] flex-shrink-0">
              <div className="pl-[45rem] text-center">
                {/*ส่วนที่ 4*/}
                <div className="origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-white"></div>
                    <div className="flex-[0.06] text-xs border border-white"></div>
                    <div className="flex-[0.06] text-xs border border-white"></div>
                    <div className="flex-[0.06] text-xs border border-white border-t-gray-500 border-l-gray-500 border-b-gray-500">
                      B04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 border-t-gray-500">
                      ชั้น
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D01
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D02
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D03
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D05
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                      4
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C03
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C02
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C01
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                      3
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-B04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-B03
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-B02
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-B01
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                      2
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-A04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-A03
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-A02
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-A01
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500">
                      1
                    </div>
                  </div>
                </div>
                <div className="mt-[13rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
                  <div className="flex">
                    <div className="flex-[0.06] text-xs border border-white border-t-gray-500 border-l-gray-500 border-b-gray-500">
                      B04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-500 border-t-gray-500">
                      ชั้น
                    </div>
                  </div>
                  <div className="flex h-[35px]">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D01
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-D02
                    </div>
                  </div>
                  <div className="flex h-[35px]">
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C04
                    </div>
                    <div className="flex-[0.06] text-xs border border-gray-300 border-b-gray-500 border-l-gray-500">
                      B01-C03
                    </div>
                  </div>
                </div>
              </div>
              {/* ///// */}
            </div>
          </div>
          <div className="mt-[5rem] ml-[50rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px]">
              <div className="flex-[0.06] text-xs ">
                <div className="">เตียงผู้ป่วย</div>
              </div>
              <div className="flex-[0.06] text-xs">
                <div className="">เตียงผู้ป่วย</div>
              </div>
            </div>
          </div>
          <div className="mt-[2rem] ml-[47.5rem] origin-top-left translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px]">
              <div className="flex-[0.06] text-xs">
                <div className="">โทรทัศน์</div>
              </div>
            </div>
          </div>
          <div className="mt-[-6.4rem] ml-[65rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px]">
              <div className="flex-[0.06] text-xs">
                <div className="">เตียงผู้ป่วย</div>
              </div>
              <div className="flex-[0.06] text-xs">
                <div className="">เตียงผู้ป่วย</div>
              </div>
            </div>
          </div>
          <div className="mt-[2rem] ml-[62.5rem] origin-top-left translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px]">
              <div className="flex-[0.06] text-xs">
                <div className="">โทรทัศน์</div>
              </div>
            </div>
          </div>
          <div className="mt-[-6.5rem] ml-[75rem] origin-top-left rotate-90 translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px] text-xs">
              <div className="">เตียงผู้ป่วย</div>
            </div>
          </div>
          <div className="mt-[2rem] ml-[73rem] origin-top-left translate-y-[-100%] translate-x-[30px] w-[calc(100vh-1rem)] flex flex-col">
            <div className="h-[35px]">
              <div className="flex-[0.06] text-xs">
                <div className="">โทรทัศน์</div>
              </div>
            </div>
          </div>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title={dialogContent.title}
            content={dialogContent.content}
          />
        </div>
      </div>
    </>
  )
}
export default App
