import { IngredentService } from '../service/ingredent.service.mjs'
export class IngredentController {
  ingredentService = new IngredentService()
  constructor() {}
  async create(req, res) {
    try {
      // get the request body
      const body = req.body;
      const validation = await this._validateCreate(body);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      await this.ingredentService.save(body, (ingredent) => {
        // return a success response in json format
        return res.status(200).json({
          message: "Ingredent created",
          data: ingredent,
        });
      });
    } catch (error) {
      // return an error status message in json format
      return res.status(500).json({
        message: "Ensure to send an encoded POST request or try again later",
        errors: error.message,
      });
    }
  }
  async read(req, res) {
    try {
      const parameter = req.query;
      const validation = this._validateRead(parameter);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      await this.ingredentService.getBy("code", parameter.code, (ingredent) => {
        return res.status(200).json({
          message: "Result Completed",
          data: ingredent.pop(),
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot access query parameter",
        errors: error.message,
      });
    }
  }
  async update(req, res) {
    try {
      // set the body data in postman like we did for post to send in the data body
      // set the params ID in postman to get send an ID along.
      // ensure to delete the comment above and implement after line #63
      const body = req.body;
      const parameter = req.query;
      const validation = this._validateUpdate(body);
      if (!parameter.code || parameter.code.length < 1) {
        return res.status(500).json({
          message: "No code found",
          errors: ["No code found"],
        });
      }
      if (!parameter.who || parameter.who.length < 1) {
        return res.status(500).json({
          message: "No [who] found when making this request",
          errors: ["No [who] found when making this request"],
        });
      }
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      await this.ingredentService.getByIndex(
        "code",
        parameter.code,
        async (doesExist) => {
          if (doesExist.length < 1) {
            return res.status(500).json({
              message: "Unknown Code",
              errors: ["Code Invalid"],
            });
          } else {
            await this.ingredentService.update(
              parameter.code,
              body,
              doesExist,
              (updated) => {
                return res.status(200).json({
                  message: "Query completed",
                  data: updated,
                });
              }
            );
          }
        }
      );
    } catch (error) {
      return res.status(500).json({
        message: "Issues with request",
        errors: error.message,
      });
    }
  }
  async delete(req, res) {
    try {
      const parameter = req.query;
      const validation = this._validateDelete(parameter);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      await this.ingredentService.getByIndex("code", parameter.code, async (index) => {
        if (index < 0) {
          return res.status(500).json({
            message: "Unknown Code",
            errors: ["Code Invalid"],
          });
        }
        await this.ingredentService.delete(index, () => {
          return res.status(200).json({
            message: "Query completed",
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Issues with request",
        errors: error.message,
      });
    }
  }
  async all(req, res) {
    try {
      const parameter = req.query;
      const validation = this._validateAll(parameter);
      if (validation.length > 0) {
        let message = ``;
        // Loop and convert all error to string using the inbuilt array forach
        validation.forEach((element) => (message += `${element}\n`));
        // return an error status message in json format
        return res.status(500).json({
          message: message,
          errors: validation,
        });
      }
      await this.ingredentService.all((result)=>{
        return res.status(200).json({
          message: "Result Completed",
          data: result,
        });
      });

    } catch (error) {
      return res.status(500).json({
        message: "Cannot access query parameter",
        errors: error.message,
      });
    }
  }
  async _validateCreate(body){
    let errors = [];
    if (!body.who) {
      errors.unshift("who is not found");
    }
    if (!body.name) {
      errors.unshift("Name is not found");
    }
    if (!body.short_description) {
      errors.unshift("short description is not found");
    }
    if (!body.full_description) {
      errors.unshift("full description is not found");
    }
    if (!body.color) {
      errors.unshift("Color is not found");
    }
    if (!body.owner) {
      errors.unshift("Owner is not found");
    }
    if (!body.companies) {
      errors.unshift("Company is not found");
    }
    if (!body.ingredents) {
      errors.unshift("Ingredents is not found");
    }
    if (body.name && body.name.length > 100) {
      errors.unshift("name is too long to update. Max character is 100");
    }
    if (body.short_description && body.short_description.length > 100) {
      errors.unshift(
        "short_description is too long to update. Max character is 100"
      );
    }
    if (body.full_description && body.full_description.length < 100) {
      errors.unshift(
        "full_description is too short to update. Min character is 100"
      );
    }
    // if (
    //   body.status &&
    //   body.status !== "Active" &&
    //   body.status !== "Inactive" &&
    //   body.status !== "Pending"
    // ) {
    //   errors.unshift(
    //     "Status must be either of these values [Active, Inactive, Pending]"
    //   );
    // }
    return errors;
  }
  _validateRead(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    return errors;
  }
  _validateUpdate(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("who is not found");
    }
    if (!body.code) {
      errors.unshift("code is not found");
    }
    if (body.name && body.name.length > 100) {
      errors.unshift("name is too long to update. Max character is 100");
    }
    if (body.short_description && body.short_description.length > 100) {
      errors.unshift(
        "short_description is too long to update. Max character is 100"
      );
    }
    if (body.full_description && body.full_description.length < 100) {
      errors.unshift(
        "full_description is too short to update. Min character is 100"
      );
    }
    if (
      body.status &&
      body.status !== "Active" &&
      body.type !== "Inactive" &&
      body.type !== "Pending"
    ) {
      errors.unshift(
        "Status must be either of these values [Active, Inactive, Pending]"
      );
    }
    return errors;
  }
  _validateDelete(body) {
    let errors = [];
    if (!body.who) {
      errors.unshift("Who sent this request");
    }
    if (!body.code) {
      errors.unshift("Code is not found");
    }
    return errors;
  }
  _validateAll(body) {
    let errors = [];
    // if (!body.who) {
    //   errors.unshift("Who sent this request");
    // }
    return errors;
  }
}
