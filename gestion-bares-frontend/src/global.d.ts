declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpg" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpeg" {
    const value: string;
    export default value;
  }
  
  declare module "*.webp" {
    const value: string;
    export default value;
  }
  
  declare module "*.json" {
    const value: string;
    export default value;
  }
  
  declare module "*.svg" {
    const value: React.FC<React.SVGProps<SVGSVGElement>>;
    export default value;
  }
  
  declare module "@fontsource-variable/inter" {
    const value: string;
    export default value;
  }
  
  declare module "@fontsource/poppins" {
    const value: string;
    export default value;
  }
  