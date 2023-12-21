import React from 'react';
import './style.scss'
import LineFullIcon from '../../assets/icon/lineFullIcon.svg'
import HeartImg from '../../assets/img/intro.png'
import PurposeImg from '../../assets/img/intro-1.png'
import ItemMember from './components/ItemMember/ItemMember';
import Avatar1 from '../../assets/img/avatar-1.png';
import Avatar2 from '../../assets/img/avatar-2.png';

const Intro = () => {
    return <div className='intro'>
        <div className='banner'>
            <div className='logo'><div><span>LT</span>Handmade</div></div>
            <div className='slogan'>
                <div>
                    <div>Sự tận tuỵ từng đường kim</div>
                    <div>Chế tạo giấc mơ, từng mảng một</div>
                    <div>Mỗi sản phẩm là một câu chuyện</div>
                </div>
            </div>
        </div>
        <img src={LineFullIcon} alt='line' width="100%" />
        <div className='about'>
            <div className='left'>
                <div>
                    <div className='title'>Về LT Handmade</div>
                    <div>Được thành lập từ năm 2016, PMP English là đơn vị uy tín và chất lượng tại Việt Nam. PMP English đã, đang và sẽ đồng hành cùng Quý phụ huynh và học viên với các chương trình đào tạo Anh văn Giao tiếp Quốc tế, Anh văn Thiếu nhi, Luyện thi TOEIC 4 Kỹ năng và Luyện thi IELTS giúp đáp ứng đầy đủ cho nhu cầu học tập, làm việc, du học của học viên.
                    </div>
                    <div>PMP English không ngừng nỗ lực hoàn thiện để mang đến cho học viên các chương trình vừa đảm bảo chất lượng về kiến thức, điểm số, vừa ứng dụng thực tế tốt vào học tập, công việc và cuộc sống.</div>
                    <div>Đến với PMP English, học viên được tư vấn lộ trình học phù hợp dựa vào kết quả bài kiểm tra trình độ đầu vào, mục tiêu và nhu cầu học của từng học viên.</div>
                    <div>Với mục tiêu mang đến một môi trường học tập ưu việt, PMP English luôn nỗ lực tạo dựng cho học viên nền tảng tiếng Anh tốt nhất để sẵn sàng vươn đến thành công trong tương lai.</div>
                </div>
            </div>
            <div className='right'>
                <img src={HeartImg} alt="" />
            </div>
        </div>
        <div className='line'>
            <hr />
            <div className='circle' />
        </div>
        <div className='purpose'>
            <div className='left'>
                <img src={PurposeImg} alt="" />
            </div>
            <div className='right'>
                <div>
                    <div className='title'>Tầm nhìn</div>
                    <div>PMP English sẽ trở thành trung tâm Anh ngữ uy tín và chất lượng tại Việt Nam. Là nơi các em học viên có thể hoàn toàn yên tâm trao gửi niềm tin để đạt mục tiêu lấy lại nền tảng Anh ngữ vững chắc, tăng khả năng giao tiếp và đạt kết quả cao trong các kỳ thi Anh ngữ quốc tế.</div>
                    <div className='title'>Sứ mệnh</div>
                    <div>PMP English sẽ trở thành trung tâm Anh ngữ uy tín và chất lượng tại Việt Nam. Là nơi các em học viên có thể hoàn toàn yên tâm trao gửi niềm tin để đạt mục tiêu lấy lại nền tảng Anh ngữ vững chắc, tăng khả năng giao tiếp và đạt kết quả cao trong các kỳ thi Anh ngữ quốc tế.</div>
                    <div className='title'>Cộng đồng LT Handmade</div>
                    <div>PMP English sẽ trở thành trung tâm Anh ngữ uy tín và chất lượng tại Việt Nam. Là nơi các em học viên có thể hoàn toàn yên tâm trao gửi niềm tin để đạt mục tiêu lấy lại nền tảng Anh ngữ vững chắc, tăng khả năng giao tiếp và đạt kết quả cao trong các kỳ thi Anh ngữ quốc tế.</div>
                </div>
            </div>
        </div>
        <img src={LineFullIcon} alt='line' width="100%" />
        <div className='member'>
            <ItemMember item={{id:"20149058",img:Avatar1,name:"Lê Minh Tài",email:"tailx0913@gmail.com",class:"20110CLST5"}}/>
            <ItemMember item={{id:"20110126",img:Avatar2,name:"Trần Thị Phương Linh",email:"phuonglinhtht321@gmail.com",class:"20110CLST4"}}/>
        </div>
    </div>
};

export default Intro;
