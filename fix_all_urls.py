import re
import sys

files_to_fix = [
    "app/about-us/page.tsx",
    "app/privacy/page.tsx",
    "app/solutions/page.tsx",
    "app/solutions/[slug]/page.tsx",
    "app/terms/page.tsx",
]

# Pattern to match the URL concatenation
pattern = r"\$\{process\.env\.NEXT_PUBLIC_STRAPI_URL \|\| 'http://localhost:1337'\}\$\{([^}]+)\.url\}"
replacement = r"getMediaURL(\1.url)"

fixed_files = []
for file_path in files_to_fix:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content

        # Replace the pattern
        content = re.sub(pattern, replacement, content)

        # Add import if needed and not present
        if content != original_content:
            # Check if getMediaURL is already imported
            if "getMediaURL" in content and "import { getMediaURL }" not in content and "import {" in content:
                # Find existing import from strapi
                strapi_import_match = re.search(r"import \{([^}]+)\} from ['\"]@/lib/strapi['\"];", content)
                if strapi_import_match:
                    # Add getMediaURL to existing import
                    existing_imports = strapi_import_match.group(1)
                    if "getMediaURL" not in existing_imports:
                        new_imports = existing_imports.strip() + ", getMediaURL"
                        content = content.replace(
                            f"import {{{existing_imports}}} from '@/lib/strapi';",
                            f"import {{{new_imports}}} from '@/lib/strapi';"
                        )
                        content = content.replace(
                            f'import {{{existing_imports}}} from "@/lib/strapi";',
                            f'import {{{new_imports}}} from "@/lib/strapi";'
                        )

            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            fixed_files.append(file_path)
            print(f"✓ Fixed: {file_path}")
        else:
            print(f"  No changes: {file_path}")

    except Exception as e:
        print(f"✗ Error fixing {file_path}: {e}")
        sys.exit(1)

print(f"\n✓ Successfully fixed {len(fixed_files)} file(s)!")
