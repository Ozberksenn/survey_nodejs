class Response {
  constructor(data = null, message = null, status) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "işlem başarılı.",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "İşlem Başarısız !",
    });
  }
  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "İşlem Başarısız !",
    });
  }
}

module.exports = Response;
