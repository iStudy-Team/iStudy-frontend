import { Link } from '@tanstack/react-router';
export default function IeltsCourseSection() {
    return (
        <div className="py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Main About Section */}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-luyen-thi-ielts-danh-cho-tat-ca-hoc-vien-tu-14-tuoi-tro-len.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-center ">
                    <div className="flex flex-col  space-y-6 h-full  right-0  w-full h-[348px] pl-190 mt-30 mr-30">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight">
                                Chương trình luyện thi IELTS – SAT (The
                                Princeton Review)
                            </h2>
                            <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold mb-6 leading-tight">
                                Sẵn sàng chinh phục – Mở lối tương lai
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                IELTS và SAT là hai chứng chỉ quan trọng để mở
                                ra cơ hội du học cho học sinh trên toàn thế
                                giới. Chương trình luyện thi IELTS Success và
                                SAT (The Princeton Review) độc quyền tại ILA
                                giúp học viên có lộ trình học rõ ràng và cam kết
                                đầu ra với điểm số cao.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Cùng đội ngũ giáo viên tinh tuyển và ngân hàng
                                bài thi phong phú, học viên từng bước chinh phục
                                mục tiêu điểm số để từ đó chủ động mở lối tương
                                lai, vươn mình ra thế giới.
                            </p>
                        </div>
                    </div>
                </div>
                {/* anh 2 */}

                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/trai-nghiem-hoc-tap-xuyen-suot-cho-ket-qua-vuot-troi-1.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8  ">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 mt-10 ml-20">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6  text-white">
                                ILA IELTS Success
                            </h2>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6  text-white mr-40">
                                Trải nghiệm học tập xuyên suốt Cho kết quả vượt
                                trội
                            </h2>
                        </div>
                    </div>
                </div>
                {/*anh 4 */}
                <div className="relative h-full  lg:min-h-[600px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/luyen-thi-sat-tpr-ila-3.jpg)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8  ">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 mt-10 ml-20">
                        <div className="flex mb-2">
                            <img
                                className="w-[133px] h-[73px]"
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/image-ila-courses-4.png"
                                alt="anh"
                            />
                            <div className="flex flex-col ">
                                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-1  ml-2">
                                    Chương trình luyện thi độc
                                </h2>
                                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-2  ml-2">
                                    quyền của iStudy và The
                                </h2>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 ">
                                Princeton Review
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-2 italic">
                                (*) The Princeton Review được thành lập từ năm
                                1981, là tổ chức giáo dục quốc tế chuyên về
                                luyện thi SAT có trụ sở tại New York, Hoa Kỳ.
                            </p>
                        </div>
                        <div className="w-[190px] h-[48px]">
                            <Link
                                to="/"
                                className="relative inline-flex items-center justify-center px-6 py-3  overflow-hidden font-medium transition-all bg-blue-700 rounded-full hover:bg-white group w-full h-full m"
                            >
                                <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                    <p className="text-xl ml-4"> Xem Thêm</p>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* anh 3*/}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/cam-ket-tu-to-chuc-dao-tao-anh-ngu-hang-dau-voi-hon-25-nam-kinh-nghiem.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-center">
                    <div className="flex flex-col justify-center space-y-6 h-full w-full right-0 pl-30 mt-20 ml-190 mr-35  ">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight ">
                                Cam kết từ tổ chức đào tạo Anh ngữ hàng đầu với
                                hơn 25 năm kinh nghiệm
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Là tổ chức đào tạo Anh ngữ hàng đầu Việt Nam với
                                hơn 25 năm kinh nghiệm, khóa luyện thi IELTS
                                Success và SAT (The Princeton Review) của ILA sẽ
                                tư vấn cho học viên lộ trình học tập khoa học
                                nhằm tối ưu hóa điểm số IELTS, SAT để chạm tới
                                các mục tiêu du học, thi tuyển vào đại học hàng
                                đầu, xa hơn là phát triển và thăng tiến trong sự
                                nghiệp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
