//ติดต่อฐานข้อมูล
const ActivitySchema= require("../models/ActivitySchema");


//บันทึกข้อมูล
exports.create = async (req, res) => {
  const { title, activity_type, date,duration,distance,note } = req.body;
 
  console.log(req.body);

  //validate
  switch (true) {
    case !title: //ถ้าเป็นค่าว่างจะรีเทิร์น
      return res.status(400).json({ error: "กรุณาป้อนชื่อ" });
      break;
    case !activity_type:
      return res.status(400).json({ error: "กรุณาเลือกประเภทกีฬา" });
      break;
    case !date:
      return res.status(400).json({ error: "กรุณาระบุวัน" });
      break;
    case !duration:
      return res.status(400).json({ error: "กรุณาระบุระยะเวลา" });
      break;
    case !distance:
      return res.status(400).json({ error: "กรุณาระบุระยะเวลาทาง" });
      break;
  }

  ActivitySchema.create({ title, activity_type, date,duration,distance,note  }) //ใช้ Schema สร้าง document
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(400).json({ error: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง" }); //เมื่อมี Error(สามารถปรับแต่งErrorได้)
    });
};

//get all
exports.getAllActivts = (req, res) => {
  ActivitySchema.find({})
    .exec()
    .then((activtsData) => {
      res.json(activtsData);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

//get one
exports.getOneActivty = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const activty = await ActivitySchema.findById(id).exec();
    console.log(activty)
    res.json(activty);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//remove
exports.removeActivity = (req, res) => {
  const id = req.params.id; // Assuming the parameter name is 'id'
  console.log(typeof id);
  ActivitySchema.findByIdAndDelete(id)
    .exec()
    .then(activity => {
      res.json({ message: 'ลบรายการออกกำลังกายนี้แล้ว' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

//update
exports.updateActivty = async (req, res) => {
  const { id } = req.params;
  console.log(req.body); //data sent in the request body
  try {
    const { nameActivity, activity ,date,distance ,duration ,note } = req.body; //updated fields from the request body
    const newActivity = await ActivitySchema.findByIdAndUpdate(
      id, { title:nameActivity, activity_type:activity ,date,distance ,duration ,note },{ new: true }
    );
    res.json(newActivity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while updating the activity' });
  }
};
