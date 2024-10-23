import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const team = [
  {
    name: "Tiến sĩ Nguyễn Văn A",
    position: "Hiệu trưởng",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Thạc sĩ Trần Thị B",
    position: "Trưởng khoa Sinh viên",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Kỹ sư Lê Văn C",
    position: "Trưởng phòng CNTT",
    image:
      "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg">
      {/* Phần giới thiệu */}
      <Box py={5}>
        <Typography variant="h3" align="center" gutterBottom>
          Giới Thiệu Greenwich Việt Nam
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          Greenwich Việt Nam là một chi nhánh của Đại học Greenwich, là một
          trong những cơ sở giáo dục hàng đầu cung cấp chất lượng đào tạo cao về
          các lĩnh vực Công nghệ thông tin, Kinh doanh và Thiết kế. Chúng tôi
          cam kết tạo ra một cộng đồng học tập năng động và bao trùm, nơi sinh
          viên có thể phát huy tối đa tiềm năng của mình.
        </Typography>
        <img
          src="https://images.pexels.com/photos/2793649/pexels-photo-2793649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={"100%"}
          style={{ borderRadius: "8px" }}
        ></img>
      </Box>

      {/* Phần Sứ mệnh và Tầm nhìn */}
      <Grid container spacing={4} py={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Sứ Mệnh Của Chúng Tôi
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sứ mệnh của chúng tôi là cung cấp một môi trường học tập năng động,
            nuôi dưỡng sự sáng tạo, tư duy phản biện và đổi mới. Chúng tôi hướng
            tới việc trang bị cho sinh viên kiến thức và kỹ năng cần thiết để
            thành công trên thị trường lao động toàn cầu.
          </Typography>
          <img
            src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={"100%"}
            style={{ borderRadius: 8 }}
          ></img>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Tầm Nhìn Của Chúng Tôi
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Tầm nhìn của chúng tôi là trở thành một cơ sở giáo dục quốc tế hàng
            đầu, nơi thay đổi cuộc sống thông qua việc đào tạo chất lượng cao,
            nuôi dưỡng tư duy toàn cầu và đam mê học tập trong mỗi sinh viên và
            phát triển năng lực toàn diện.
          </Typography>
          <img
            src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={"100%"}
            style={{ borderRadius: 8 }}
          ></img>
        </Grid>
      </Grid>

      {/* Phần Đội ngũ */}
      <Box py={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Đội Ngũ Của Chúng Tôi
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    {member.position}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
