
const CategoryService = require("../service/category-service")
const ApiError = require("../exceptions/api-error")

class CategoryController {

    async creatCategory(req, res, next){
        try {
            const {name} = req.body
            if (!name) {
                return next(ApiError.BadRequest("name не передан"))
            }

            const categoryData = await CategoryService.creatCategory( name)
            res.json(categoryData)
        } catch (error) {
            next(error)
        }
    }

  
    async getCategorys(req, res, next) {
        try {
            const categoryData = await CategoryService.getCategorys()
            res.json(categoryData)
        } catch (error) {
            next(error)
        }
    }
    
    async getCategory(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const categoryData = await CategoryService.getCategory(id)
            res.json(categoryData)
        } catch (error) {
            next(error)
        }
    }
  

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await CategoryService.deleteCategory(id)
            res.json("Удалённо")
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new CategoryController()