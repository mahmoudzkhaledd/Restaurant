async function genPass() {
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt();

}
genPass();
