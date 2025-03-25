require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const orderService = require("../services/orderService");

const bookMovie = async (req, res) => {
    try {
        const { movieId, numTickets, paymentStatus } = req.body;
        const userId = req.user.id;

        const order = await orderService.bookMovie(userId, movieId, numTickets, paymentStatus);

        return APIResponse.success(res, {
            status: 201,
            message: Messages.ORDERS.BOOKING_SUCCESS,
            data: { orderId: order._id, numTickets, order }
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: Messages.ORDERS.BOOKING_FAILED,
            data: error.message
        });
    }
};


const updateStatus = async (req, res) => {
    try {
        const { orderId, paymentStatus } = req.body;
        const updatedOrder = await orderService.updatePaymentStatus(orderId, paymentStatus);

        return APIResponse.success(res, {
            status: 200,
            message: `Payment status updated to ${paymentStatus}`,
            data: updatedOrder
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: Messages.ORDERS.ERROR_UPDATING_PAYMENT,
            data: error.message
        });
    }
};


const compOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const completedOrders = await orderService.getCompletedOrders(userId);

        return APIResponse.success(res, {
            status: 200,
            message: Messages.ORDERS.COMPLETED_ORDERS_FOUND,
            data: completedOrders
        });
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: Messages.SYSTEM.SERVER_ERROR,
            data: error.message
        });
    }
};


const getAllCompletedOrders = async (req, res) => {
    try {
        const completedOrders = await orderService.getAllCompletedOrders();

        if (completedOrders.length === 0) {
            return APIResponse.error(res, { status: 404, message: Messages.ORDERS.NO_COMPLETED_ORDERS});
        }

        return APIResponse.success(res, {
            status: 200,
            message: Messages.ORDERS.COMPLETED_ORDERS_FOUND,
            data: completedOrders,
        });
    } catch (error) {
        console.error("❌ Error fetching all completed orders:", error);
        return APIResponse.error(res, { status: 500, message: Messages.ORDERS.ERROR_FETCHING_ORDERS, error: error.message });
    }
};


module.exports = {
     bookMovie, 
     updateStatus, 
     compOrders,
     getAllCompletedOrders
};
