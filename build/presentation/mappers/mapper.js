"use strict";
// src/presentation/mappers/category-mapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationMapper = exports.AppointmentMapper = exports.QuizMapper = exports.EnrollmentMapper = exports.LessonMapper = exports.CourseMapper = exports.PaymentMapper = exports.OrderMapper = exports.ProductReviewMapper = exports.LessonReviewMapper = exports.RoleMapper = exports.UserDocMapper = exports.ProductMapper = exports.StoreMapper = exports.BranchMapper = exports.TagMapper = exports.DocumentMapper = exports.CommentMapper = exports.UserMapper = exports.PostMapper = exports.SubCategoryMapper = exports.BannerMapper = exports.CategoryMapper = void 0;
class CategoryMapper {
    toDTO(category) {
        const entity = category.toJSON();
        return entity;
    }
    toDTOs(categories) {
        const _categories = categories.map((category) => {
            const entity = category.toJSON();
            return entity;
        });
        return _categories;
    }
}
exports.CategoryMapper = CategoryMapper;
class BannerMapper {
    toDTO(banner) {
        const entity = banner.toJSON();
        return entity;
    }
    toDTOs(banners) {
        const _banners = banners.map((banner) => {
            const entity = banner.toJSON();
            return entity;
        });
        return _banners;
    }
}
exports.BannerMapper = BannerMapper;
class SubCategoryMapper {
    toDTO(subCategory) {
        const entity = subCategory.toJSON();
        return entity;
    }
    toDTOs(subCategories) {
        const _subCategories = subCategories.map((subCategory) => {
            const entity = subCategory.toJSON();
            return entity;
        });
        return _subCategories;
    }
}
exports.SubCategoryMapper = SubCategoryMapper;
class PostMapper {
    toDTO(post) {
        const entity = post.toJSON();
        return entity;
    }
    toDTOs(posts) {
        const _posts = posts.map((post) => {
            const entity = post.toJSON();
            return entity;
        });
        return _posts;
    }
}
exports.PostMapper = PostMapper;
class UserMapper {
    toDTO(user) {
        const entity = user.toJSON();
        return entity;
    }
    toDTOs(users) {
        const _users = users.map((user) => {
            const entity = user.toJSON();
            return entity;
        });
        return _users;
    }
}
exports.UserMapper = UserMapper;
class CommentMapper {
    toDTO(comment) {
        const entity = comment.toJSON();
        return entity;
    }
    toDTOs(comments) {
        const _comments = comments.map((comment) => {
            const entity = comment.toJSON();
            return entity;
        });
        // const filteredComments = _comments.filter(c => c.parent_id === "" || c.parent_id === null);
        return _comments;
    }
}
exports.CommentMapper = CommentMapper;
class DocumentMapper {
    toDTO(document) {
        const entity = document.toJSON();
        return entity;
    }
    toDTOs(documents) {
        const _documents = documents.map((document) => {
            const entity = document.toJSON();
            return entity;
        });
        return _documents;
    }
}
exports.DocumentMapper = DocumentMapper;
class TagMapper {
    toDTO(tag) {
        const entity = tag.toJSON();
        return entity;
    }
    toDTOs(tags) {
        const _tags = tags.map((tag) => {
            const entity = tag.toJSON();
            return entity;
        });
        return _tags;
    }
}
exports.TagMapper = TagMapper;
class BranchMapper {
    toDTO(branch) {
        const entity = branch.toJSON();
        return entity;
    }
    toDTOs(branches) {
        const _branches = branches.map((branch) => {
            const entity = branch.toJSON();
            return entity;
        });
        return _branches;
    }
}
exports.BranchMapper = BranchMapper;
class StoreMapper {
    toDTO(store) {
        const entity = store.toJSON();
        return entity;
    }
    toDTOs(stores) {
        const _stores = stores.map((store) => {
            const entity = store.toJSON();
            return entity;
        });
        return _stores;
    }
}
exports.StoreMapper = StoreMapper;
class ProductMapper {
    toDTO(product) {
        const entity = product.toJSON();
        return entity;
    }
    toDTOs(products) {
        const _products = products.map((product) => {
            const entity = product.toJSON();
            return entity;
        });
        return _products;
    }
}
exports.ProductMapper = ProductMapper;
class UserDocMapper {
    toDTO(userDoc) {
        const entity = userDoc.toJSON();
        return entity;
    }
    toDTOs(userDocs) {
        const _userDocs = userDocs.map((userDoc) => {
            const entity = userDoc.toJSON();
            return entity;
        });
        return _userDocs;
    }
}
exports.UserDocMapper = UserDocMapper;
class RoleMapper {
    toDTO(role) {
        const entity = role.toJSON();
        return entity;
    }
    toDTOs(roles) {
        const _roles = roles.map((role) => {
            const entity = role.toJSON();
            return entity;
        });
        return _roles;
    }
}
exports.RoleMapper = RoleMapper;
class LessonReviewMapper {
    toDTO(review) {
        const entity = review.toJSON();
        return entity;
    }
    toDTOs(reviews) {
        const _reviews = reviews.map((review) => {
            const entity = review.toJSON();
            return entity;
        });
        return _reviews;
    }
}
exports.LessonReviewMapper = LessonReviewMapper;
class ProductReviewMapper {
    toDTO(review) {
        const entity = review.toJSON();
        return entity;
    }
    toDTOs(reviews) {
        const _reviews = reviews.map((review) => {
            const entity = review.toJSON();
            return entity;
        });
        return _reviews;
    }
}
exports.ProductReviewMapper = ProductReviewMapper;
class OrderMapper {
    toDTO(order) {
        const entity = order.toJSON();
        return entity;
    }
    toDTOs(orders) {
        const _orders = orders.map((order) => {
            const entity = order.toJSON();
            return entity;
        });
        return _orders;
    }
}
exports.OrderMapper = OrderMapper;
class PaymentMapper {
    toDTO(payment) {
        const entity = payment.toJSON();
        return entity;
    }
    toDTOs(payments) {
        const _payments = payments.map((payment) => {
            const entity = payment.toJSON();
            return entity;
        });
        return _payments;
    }
}
exports.PaymentMapper = PaymentMapper;
/**
 * course module
 */
class CourseMapper {
    toDTO(course) {
        const entity = course.toJSON();
        return entity;
    }
    toDTOs(courses) {
        const _courses = courses.map((course) => {
            const entity = course.toJSON();
            return entity;
        });
        return _courses;
    }
}
exports.CourseMapper = CourseMapper;
class LessonMapper {
    toDTO(lesson) {
        const entity = lesson.toJSON();
        return entity;
    }
    toDTOs(lessons) {
        const _lessons = lessons.map((lesson) => {
            const entity = lesson.toJSON();
            return entity;
        });
        return _lessons;
    }
}
exports.LessonMapper = LessonMapper;
class EnrollmentMapper {
    toDTO(enrollment) {
        const entity = enrollment.toJSON();
        return entity;
    }
    toDTOs(enrollments) {
        const _enrollments = enrollments.map((enrollment) => {
            const entity = enrollment.toJSON();
            return entity;
        });
        return _enrollments;
    }
}
exports.EnrollmentMapper = EnrollmentMapper;
class QuizMapper {
    toDTO(quiz) {
        const entity = quiz.toJSON();
        return entity;
    }
    toDTOs(quizes) {
        const _quizes = quizes.map((quiz) => {
            const entity = quiz.toJSON();
            return entity;
        });
        return _quizes;
    }
}
exports.QuizMapper = QuizMapper;
class AppointmentMapper {
    toDTO(appointment) {
        const entity = appointment.toJSON();
        return entity;
    }
    toDTOs(appointments) {
        const _appointments = appointments.map((appointment) => {
            const entity = appointment.toJSON();
            return entity;
        });
        return _appointments;
    }
}
exports.AppointmentMapper = AppointmentMapper;
class ConsultationMapper {
    toDTO(consultation) {
        const entity = consultation.toJSON();
        return entity;
    }
    toDTOs(consultations) {
        const _consultations = consultations.map((consultation) => {
            const entity = consultation.toJSON();
            return entity;
        });
        return _consultations;
    }
}
exports.ConsultationMapper = ConsultationMapper;
