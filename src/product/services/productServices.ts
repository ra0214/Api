import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";

export class productService {

    public static async getAllProducts(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(productId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async addProduct(product: Product) {
        try {
            product.created_at = DateUtils.formatDate(new Date());
            product.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.createProduct(product);
        } catch (error: any) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    public static async modifyProduct(productId: number, productData: Product) {
        try {
            const productFinded = await ProductRepository.findById(productId);
            if (productFinded) {
                if (productData.product_name) {
                    productFinded.product_name = productData.product_name;
                }
                if (productData.price) {
                    productFinded.price = productData.price;
                }
                if (productData.stock) {
                    productFinded.stock = productData.stock;
                }
                if (productData.description) {
                    productFinded.description = productData.description;
                }
                if (productData.deleted) {
                    productFinded.deleted = productData.deleted;
                }
            } else {
                return null;
            }
            productFinded.updated_by = productData.updated_by;
            productFinded.updated_at = DateUtils.formatDate(new Date());
            return await ProductRepository.updateProduct(productId, productFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar el producto: ${error.message}`);
        }
    }

    public static async deleteProduct(productId: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProduct(productId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}
