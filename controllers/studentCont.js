import logger from "../logger/index.js";
import StudentModel from "../model/student.js";

class StudendCont {
    static getAllDoc = async (req, res) => {
        try {
            const result = await StudentModel.find()
            logger.info('info');
            logger.warn('warn');
            logger.error('debug');
            res.render("index.ejs", { data: result })
        }
        catch {
            console.log('Data is not found')
        }

    }
    
    static createDoc = async (req, res) => {
        try {
            const { name, age, fees } = req.body
            const doc = new StudentModel({
                name: name,
                age: age,
                fees: fees
            })
            const result = await doc.save()
            console.log(result)
            res.redirect("/")
        } catch (error) {

        }
    }
    static editDoc = async (req, res) => {
        try {
            const result = await StudentModel.findById(req.params.id)
            console.log(result)
            res.render("edit.ejs",{data:result})
        } catch (error) {
            console.log(error)
        }
        //console.log(req.params.id)

    }
    static updateDocById = async(req, res) => {
        try {
            const result = await StudentModel.findByIdAndUpdate(req.params.id,req.body)
            //console.log(result);
            res.redirect("/")
        } catch (error) {
            console.log(error)
        }
        
        
    }
    static deleteDocById = async(req, res) => {
        try {
            const result = await StudentModel.findByIdAndRemove(req.params.id)
            //console.log(result);
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }
}

export default StudendCont;